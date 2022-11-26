class ErrorMessage {
    constructor(code, message){
        this.code = code,
        this.message = message
    }
    static badRequest(message) {
        return new ErrorMessage(400, message)
    }

    static internalError(message) {
        return new ErrorMessage(500, message)
    }
}

module.exports = ErrorMessage