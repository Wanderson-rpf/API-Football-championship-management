import { NextFunction, Request, Response } from 'express';

const valuesFields = {
  login: ['email', 'password'],
};

const verifyRequiredFields = (keyFields: keyof typeof valuesFields) =>
  (req: Request, res: Response, next: NextFunction): Response | void => {
    const requiredFields = valuesFields[keyFields];
    for (let i = 0; i < requiredFields.length; i += 1) {
      if (!req.body[requiredFields[i]]) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }
    }
    next();
  };

export default verifyRequiredFields;
