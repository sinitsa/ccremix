export type Session = {
    login: string;
    tokens: Tokens
}

export type Tokens = {
    access: string;
    refresh: string;
}