let errorHandler = (error, request, response, next) => {
    // e = my Server error --> IT HAS AN ENUM INSIDE (!!) called errorType
    if (error.errorType !== undefined) {

        if (e.errorType.isShowStackTrace) {
            console.e(error);
        }

        response.status(e.errorType.httpCode).json({ er: error.errorType.message });
        return;
    }

    // This is most definitely a bug (not a ServerError) and so we want the log
    // Reaching here means that we got an UNEXPECTED BUG which we didn't wrap with a ServerError
    console.e(error.message);
    response.status(700).json({ er: error.message });
}

module.exports = errorHandler;