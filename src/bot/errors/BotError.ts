import ErrorCodes from "./ErrorCodes";
import ErrorMessages from "./ErrorMessages";

function ErrorMessage(code: ErrorCodes, args?: any) {
    if (!(code in ErrorCodes)) throw new BotError(ErrorCodes.invalidErrorCode);
    const message = ErrorMessages[code];
    if (!message) return "a Generic error occured";
    if (typeof message === "function") return message([...args] as any);
    return message;
}

class BotError extends Error {
    public readonly code: ErrorCodes;

    constructor(code: ErrorCodes, ...args: any) {
        super(ErrorMessage(code, args));
        this.code = code;
        Error.captureStackTrace(this, BotError);
    } 

    public get name(): string {
        // eg; "BotError [1]"
        return `${super.name} [${this.code}]`;
    } 
}

export default BotError;