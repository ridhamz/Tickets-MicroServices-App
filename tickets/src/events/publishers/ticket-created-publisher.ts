import { Publisher, Subjects, TicketCreatedEvent } from 'mz-tools';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
