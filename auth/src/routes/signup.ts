import { BadRequestError } from './../errors/bad-request-error';
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user';
import { Password } from '../utils/password';

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
  async (req: Request, res: Response) => {
    // handle errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
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

    res.status(201).send({
      message: 'User created',
      user,
    });
  }
);

export { router as signUpRouter };
