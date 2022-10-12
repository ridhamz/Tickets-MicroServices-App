import { BadRequestError } from 'mz-tools';
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { User } from '../models/user';
import jwt from 'jsonwebtoken';
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
  '/api/users/signup',
  validateParams(),
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // check if the user email already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new BadRequestError('Email is already exist');
    }

    // create the user object
    const user = User.build({
      email,
      password,
    });

    // save the user in the data base
    await user.save();

    // generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = { jwt: token };

    res.status(201).send(user);
  }
);

export { router as signUpRouter };
