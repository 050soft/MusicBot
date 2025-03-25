export interface APIError {
    message: string
    error: number
}

import Methods from "./Methods";
import Response from "./APIResponse";

export default class ErrorResponse extends Response<Methods.Error> {
    constructor(data: APIError) {
        super(data);
    }
}