import express, { Response, Request } from 'express';
import { currentUser } from 'mz-tools';

const router = express.Router();

router.get('/api/users/current', currentUser, (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
