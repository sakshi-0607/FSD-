function notFound(req, res, next) {
  res.status(404).json({
    message: "Route not found",
  });
}

function errorHandler(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      message: "Invalid JSON request body",
    });
  }

  console.error(err);
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message || "Internal server error",
  });
}

module.exports = {
  notFound,
  errorHandler,
};

