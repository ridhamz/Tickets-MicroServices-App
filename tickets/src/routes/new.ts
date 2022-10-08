import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import nats from 'node-nats-streaming';
import { requireAuth, validateRequest } from 'mz-tools';
import { Ticket } from '../models/ticket';

const router = express.Router();

// const stan = nats.connect('ticketing', 'tickets', {
//   url: 'http://nats-srv:4222',
// });

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
      type: 'ticket:created',
      data: ticket,
    };
    // stan.publish('ticket:created', JSON.stringify(event), () => {
    //   console.log('Ticket creation event published');
    // });

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
