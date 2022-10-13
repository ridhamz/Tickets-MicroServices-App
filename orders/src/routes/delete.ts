import { OrderCancelledPublisher } from './../events/publishers/order-cancelled-publisher';
import express, { Request, Response } from 'express';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  currentUser,
  NotAuthorizedError,
} from 'mz-tools';
import { natsWrapper } from '../nats-wrapper';
import { Order, OrderStatus } from '../models/order';

const router = express.Router();

router.delete(
  '/api/orders/:id',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const order = await Order.findById(id).populate('ticket');

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();

    // publishing an event saying this was cancelled!
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: id,
      ticket: {
        id: order.ticket.id,
      },
    });
    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
