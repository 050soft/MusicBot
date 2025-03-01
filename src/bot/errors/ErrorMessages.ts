import ErrorCodes from "./ErrorCodes";

const ErrorMessages = {
    [ErrorCodes.invalidErrorCode]: "Invalid BotError code supplied",
    [ErrorCodes.cannotReplyToInteraction]: (interactionType: string) => `Cannot reply to this interaction of type ${interactionType}`,
    [ErrorCodes.notLoggedIn]: (platform: string) => `You need to login with \`${platform}\` to use this command.`,
}

export default ErrorMessages;