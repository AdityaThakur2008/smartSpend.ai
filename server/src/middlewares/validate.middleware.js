import AppError from "../utils/AppError.js";

const validatorMiddleware = (schema) => (req, res, next) => {
  const validationResult = schema.safeParse(req.body);

  if (!validationResult.success) {
    return next(
      new AppError("Validation Error", 400, validationResult.error.flatten()),
    );
  }
  req.validatedData = validationResult.data;
  next();
};

export default validatorMiddleware;
