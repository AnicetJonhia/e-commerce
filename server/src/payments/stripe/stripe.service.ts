import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new BadRequestException('STRIPE_SECRET_KEY manquant');
    this.stripe = new Stripe(key);
  }

  async createCheckoutSession(data: {
    orderId: string;
    amount: number;
    currency?: string;
    userId: string;
  }): Promise<{ url: string }> {
    const { orderId, amount, currency = 'eur', userId } = data;

    // 1) Crée la session Checkout
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency,
            product_data: { name: `Commande ${orderId}` },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      metadata: { orderId, userId },
      success_url: this.getAbsoluteUrl(process.env.FRONTEND_SUCCESS_URL),
      cancel_url: this.getAbsoluteUrl(process.env.FRONTEND_CANCEL_URL),
    });

    // 2) Enregistre un paiement “en_attente” pour suivi
    const payment = this.paymentRepository.create({
      orderId,
      amount,
      currency,
      method: 'stripe',
      status: 'en_attente',
      transactionId: session.id,
    });
    await this.paymentRepository.save(payment);

    // 3) Retourne l’URL Checkout
    return { url: session.url! };
  }

  /** Vérifie que l’URL commence bien par http:// ou https:// */
  private getAbsoluteUrl(envVar?: string): string {
    if (!envVar) throw new BadRequestException('URL de redirection non configurée');
    if (!/^https?:\/\//.test(envVar)) {
      throw new BadRequestException(`Invalid URL: ${envVar}`);
    }
    return envVar;
  }
}
