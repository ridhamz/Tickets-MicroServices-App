import { Subjects, Publisher, OrderCancelledEvent } from 'mz-tools';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
