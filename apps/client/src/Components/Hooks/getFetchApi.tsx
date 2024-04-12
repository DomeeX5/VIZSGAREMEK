interface Options {
    accessToken?: string | null,
    method?: string,
    body?: any
    jsonResponse?: boolean;
}

export async function fetchApiEndpoints(
    fetchURL: string,
    {accessToken, method, body, jsonResponse = true}: Options = {}): Promise<any> {
    try {
        const headers: { [key: string]: string } = {
            'Content-type': 'application/json',
        };

        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }

        const requestOptions: RequestInit = {
            method,
            headers,
        };

        if (body) {
            requestOptions.body = JSON.stringify(body);
        }

        const response = await fetch(fetchURL, requestOptions);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        if (jsonResponse) {
            return await response.json();
        }

        return null;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Error fetching data');
    }
}
