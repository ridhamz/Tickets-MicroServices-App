import { Publisher, Subjects, TicketUpdatedEvent } from 'mz-tools';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
