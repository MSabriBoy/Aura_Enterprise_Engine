const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (!error) {
      return next();
    }

    const errors = error.details.map(
      ({ message, path }) => ({
        field: path[0],
        message,
      })
    );

    return res.status(400).json({
      success: false,
      errors,
    });
  };
};

module.exports = validateRequest;