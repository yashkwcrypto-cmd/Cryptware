export const sendSuccess = (res, message = "Success", data = {}, code = 200) => {
    res.status(code).json({
        status: true,
        code,
        message,
        data,
    });
};

export const sendError = (res, message = "Some thing wrong", code = 500) => {
    res.status(code).json({
        status: false,
        code,
        message,
    });
};