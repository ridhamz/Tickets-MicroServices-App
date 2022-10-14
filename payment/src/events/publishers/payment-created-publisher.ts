import { Subjects, Publisher, PaymentCreatedEvent } from 'mz-tools';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
