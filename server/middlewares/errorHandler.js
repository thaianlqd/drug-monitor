// server/middlewares/errorHandler.js

// Middleware bắt lỗi 404 (không tìm thấy route)
function notFoundHandler(req, res, next) {
    res.status(404);
    res.render("error", {
        message: "Oops! Trang bạn tìm không tồn tại.",
        status: 404
    });
}

// Middleware bắt lỗi chung
function errorHandler(err, req, res, next) {
    console.error(err.stack); // log lỗi ra console

    res.status(err.status || 500);
    res.render("error", {
        message: err.message || "Đã có sự cố xảy ra, vui lòng thử lại sau!",
        status: err.status || 500
    });
}

module.exports = {
    notFoundHandler,
    errorHandler
};
