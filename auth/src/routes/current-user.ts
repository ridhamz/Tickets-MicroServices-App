import express, { Response, Request } from 'express';
import { currentUser } from '../../../common/src/middlewares/current-user';
import { requireAuth } from '../../../common/src/middlewares/require-auth';

const router = express.Router();

router.get('/api/users/current', currentUser, (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
