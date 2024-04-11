export interface CustomRequest extends Request {
    user: {
        id: number;
        name: string;
    };
}

export const mockRequest = (body: any = {}): CustomRequest => {
    const req: Partial<CustomRequest> = {
        body: body,
        user: {
            id: 1,
            name: 'test'
        }

    };
    return req as CustomRequest;
};