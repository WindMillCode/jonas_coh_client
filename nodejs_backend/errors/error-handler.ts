let errorHandler = (error, request, response, next) => {
    if (error.errorType !== undefined) {

        if (error.errorType.isShowStackTrace) {
            console.log(error);
        }

        response.status(error.errorType.httpCode).json({ er: error.errorType.message });
        return;
    }

    // This is most definitely a bug (not a ServerError) and so we want the log
    // Reaching here means that we got an UNEXPECTED BUG which we didn't wrap with a ServerError
    console.log(error.message);
    response.status(700).json({ er: error.message });
}

export default errorHandler;
