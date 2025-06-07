import { Injectable, Logger } from '@nestjs/common';
import { Client, logger } from 'camunda-external-task-client-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CamundaService {
  private readonly logger = new Logger(CamundaService.name);
  private client: Client;

  constructor(private configService: ConfigService) {
    this.initializeCamundaClient();
  }

  private initializeCamundaClient() {
    const camundaUrl = this.configService.get('CAMUNDA_URL', 'http://localhost:8080/engine-rest');
    
    this.client = new Client({
      baseUrl: camundaUrl,
      use: logger,
      asyncResponseTimeout: 10000,
    });

    this.logger.log(`Camunda client initialized with URL: ${camundaUrl}`);
    this.setupTaskHandlers();
  }

  private setupTaskHandlers() {
    // Handler pour la validation de commande
    this.client.subscribe('validate-order', async ({ task, taskService }) => {
      this.logger.log(`Processing order validation for order: ${task.variables.get('orderId')}`);
      
      try {
        const orderId = task.variables.get('orderId');
        const orderData = task.variables.get('orderData');
        
        // Logique de validation de commande
        const isValid = await this.validateOrder(orderData);
        
        await taskService.complete(task, {
          orderValid: isValid,
          validationMessage: isValid ? 'Order validated successfully' : 'Order validation failed'
        });
        
        this.logger.log(`Order validation completed for order: ${orderId}, valid: ${isValid}`);
      } catch (error) {
        this.logger.error(`Order validation failed: ${error.message}`);
        await taskService.handleFailure(task, {
          errorMessage: error.message,
          errorDetails: error.stack,
          retries: 3,
          retryTimeout: 5000,
        });
      }
    });

    // Handler pour le traitement de paiement
    this.client.subscribe('process-payment', async ({ task, taskService }) => {
      this.logger.log(`Processing payment for order: ${task.variables.get('orderId')}`);
      
      try {
        const orderId = task.variables.get('orderId');
        const paymentData = task.variables.get('paymentData');
        
        // Logique de traitement de paiement
        const paymentResult = await this.processPayment(paymentData);
        
        await taskService.complete(task, {
          paymentSuccess: paymentResult.success,
          transactionId: paymentResult.transactionId,
          paymentMessage: paymentResult.message
        });
        
        this.logger.log(`Payment processing completed for order: ${orderId}, success: ${paymentResult.success}`);
      } catch (error) {
        this.logger.error(`Payment processing failed: ${error.message}`);
        await taskService.handleFailure(task, {
          errorMessage: error.message,
          errorDetails: error.stack,
          retries: 3,
          retryTimeout: 5000,
        });
      }
    });

    // Handler pour l'envoi de notifications
    this.client.subscribe('send-notification', async ({ task, taskService }) => {
      this.logger.log(`Sending notification for order: ${task.variables.get('orderId')}`);
      
      try {
        const orderId = task.variables.get('orderId');
        const notificationType = task.variables.get('notificationType');
        const userEmail = task.variables.get('userEmail');
        
        // Logique d'envoi de notification
        await this.sendNotification(notificationType, userEmail, orderId);
        
        await taskService.complete(task, {
          notificationSent: true,
          notificationMessage: 'Notification sent successfully'
        });
        
        this.logger.log(`Notification sent for order: ${orderId}`);
      } catch (error) {
        this.logger.error(`Notification sending failed: ${error.message}`);
        await taskService.handleFailure(task, {
          errorMessage: error.message,
          errorDetails: error.stack,
          retries: 2,
          retryTimeout: 3000,
        });
      }
    });
  }

  async startOrderProcess(orderData: any): Promise<string> {
    try {
      const processInstance = await this.client.createProcessInstance({
        processDefinitionKey: 'order-processing',
        variables: {
          orderId: orderData.id,
          orderData: orderData,
          userEmail: orderData.userEmail,
          paymentData: orderData.paymentData
        }
      });

      this.logger.log(`Started order process for order: ${orderData.id}, processInstanceId: ${processInstance.id}`);
      return processInstance.id;
    } catch (error) {
      this.logger.error(`Failed to start order process: ${error.message}`);
      throw error;
    }
  }

  private async validateOrder(orderData: any): Promise<boolean> {
    // Simulation de validation de commande
    this.logger.log('Validating order...');
    
    // Vérifications basiques
    if (!orderData.items || orderData.items.length === 0) {
      return false;
    }
    
    if (!orderData.shippingAddress) {
      return false;
    }
    
    if (orderData.total <= 0) {
      return false;
    }
    
    // Simulation d'une validation asynchrone
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  }

  private async processPayment(paymentData: any): Promise<{ success: boolean; transactionId?: string; message: string }> {
    // Simulation de traitement de paiement
    this.logger.log('Processing payment...');
    
    // Simulation d'une API de paiement
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulation de succès/échec (90% de succès)
    const success = Math.random() > 0.1;
    
    if (success) {
      return {
        success: true,
        transactionId: `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        message: 'Payment processed successfully'
      };
    } else {
      return {
        success: false,
        message: 'Payment failed - insufficient funds'
      };
    }
  }

  private async sendNotification(type: string, email: string, orderId: string): Promise<void> {
    // Simulation d'envoi de notification
    this.logger.log(`Sending ${type} notification to ${email} for order ${orderId}`);
    
    // Ici vous pourriez intégrer un service d'email réel comme SendGrid, Mailgun, etc.
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.logger.log(`Notification sent successfully`);
  }

  async getProcessStatus(processInstanceId: string): Promise<any> {
    try {
      // Récupérer le statut du processus depuis Camunda
      // Cette méthode nécessiterait l'API REST de Camunda
      this.logger.log(`Getting process status for: ${processInstanceId}`);
      return { status: 'running', processInstanceId };
    } catch (error) {
      this.logger.error(`Failed to get process status: ${error.message}`);
      throw error;
    }
  }
}