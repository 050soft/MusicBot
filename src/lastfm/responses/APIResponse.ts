import ErrorResponse from "./ErrorResponse";
import Responses from "./Responses";

export default class Response<RType extends keyof Responses> {
    public readonly data: Responses[RType];

    constructor(data: Responses[RType]) {
        this.data = data;
    }

    public IsError(): this is ErrorResponse {
        return this instanceof ErrorResponse;
        // if (
        //     "message" in this.data && 
        //     typeof(this.data.message) === "string" && 
        //     "error" in this.data && 
        //     typeof(this.data.error) === "number"
        // ) return true; 

        // return false;
    }
}
