import ErrorCodes from "./ErrorCodes";

const ErrorMessages = {
    [ErrorCodes.invalidErrorCode]: "Invalid BotError code supplied",

    [ErrorCodes.notLoggedIn]: (platform: string) => `You need to login with \`${platform}\` to use this command.`
}

export default ErrorMessages;