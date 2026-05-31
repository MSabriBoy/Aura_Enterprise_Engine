const errorHandler = (
  error,
  req,
  res,
  next
) => {
  console.error(error);

  return res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : error.message,
  });
};

module.exports = errorHandler;