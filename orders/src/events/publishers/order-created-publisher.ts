import { Subjects, Publisher, OrderCreatedEvent } from 'mz-tools';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
