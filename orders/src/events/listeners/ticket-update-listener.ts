import { Subjects, Listener, TicketUpdatedEvent } from 'mz-tools';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-grop-name';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;

  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    const { id, title, price, version } = data;
    const ticket = await Ticket.findByEvent(data);
    if (!ticket) throw new Error('Ticket not found!!!');
    ticket.set({
      title,
      price,
    });
    await ticket.save();
    msg.ack();
  }
}
