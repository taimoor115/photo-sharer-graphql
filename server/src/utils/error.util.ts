export function handleError(message: string, code: string, httpStatus: number): never {
    const error: any = new Error(message);
    error.extensions = { code, httpStatus };
    throw error;
}