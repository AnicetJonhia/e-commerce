import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentStatus } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async findByOrder(orderId: string): Promise<Payment[]> {
    return this.paymentRepository.find({
      where: { orderId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOneBy({ id });
    if (!payment) throw new NotFoundException('Paiement non trouvé');
    return payment;
  }

  async updateStatus(
    id: string,
    status: PaymentStatus,
    transactionId?: string,
  ): Promise<Payment> {
    const payment = await this.findOne(id);
    payment.status = status;
    if (transactionId) payment.transactionId = transactionId;
    return this.paymentRepository.save(payment);
  }

  async refund(id: string, amount?: number): Promise<Payment> {
    const payment = await this.findOne(id);
    payment.status = 'remboursé';
    return this.paymentRepository.save(payment);
  }
}
