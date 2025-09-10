export interface GraphqlContext {
    user?: PASETO_TOKEN | null;
}


export interface PASETO_TOKEN {
    sub: string;
    email: string;
    iat: string;
    exp: string;
}