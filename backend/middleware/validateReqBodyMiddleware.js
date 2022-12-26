import { validateUser } from '../utils/validation/validateUser';

export const validateUserBody = (req, res, next) => {
  const errors = validateUser(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: errors });
  }
  next();
};