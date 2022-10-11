import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import nats from 'node-nats-streaming';
import { requireAuth, Subjects, validateRequest } from 'mz-tools';
import { Ticket } from '../models/ticket';
import { TicketCreatedPublisher } from '../../events/publishers/ticket-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await ticket.save();

    const event = {
      subject: Subjects.TicketCreated,
      data: {
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
      },
    };

    // publish the create ticket event
    // @ts-ignore
    new TicketCreatedPublisher(natsWrapper.client).publish(event);
    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
