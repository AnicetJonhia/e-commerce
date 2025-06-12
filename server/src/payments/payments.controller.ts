import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe/stripe.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('stripe/create-session')
  async createCheckoutSession(
    @Body() dto: { orderId: string; amount: number; userId: string },
  ) {
    const { url } = await this.stripeService.createCheckoutSession(dto);
    return { url };
  }
}
