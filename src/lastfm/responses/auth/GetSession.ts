export default interface GetSession {
    session: Session
    _status: string
}

export interface Session {
    name: string
    key: string
    subscriber: string
}
