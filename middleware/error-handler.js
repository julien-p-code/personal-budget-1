// middleware/error-handler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Customize error response based on error type if needed.
    res.status(500).json({ success: false, message: 'Internal Server Error' });
};

module.exports = errorHandler;