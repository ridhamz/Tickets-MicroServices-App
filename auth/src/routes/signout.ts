import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  req.session = null;
  res.send({ currentUser: null });
});

export { router as signOutRouter };
