import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { BadRequestError } from 'mz-tools';
import { User } from '../models/user';
import { Password } from '../utils/password';
import { validateRequest } from 'mz-tools';

const router = express.Router();

const validateParams = () => [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters'),
];

router.post(
  '/api/users/signin',
  validateParams(),
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // check if the user email already exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError('incorrect email or password!!!');
    }

    const passwordMatched = Password.compare(user.password, password);
    if (!passwordMatched)
      throw new BadRequestError('incorrect email or password!!!');
    // generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = { jwt: token };

    res.status(200).send(user);
  }
);

export { router as signInRouter };
