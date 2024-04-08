export async function fetchApiEndpoints(
    fetchURL: string,
    accessToken?: string | null,
    method?: string,
    body?: any): Promise<any> {
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

        const contentLength = response.headers.get('Content-Length');
        if (contentLength && parseInt(contentLength) === 0) {
            return null;
        } else {
            return await response.json();
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Error fetching data');
    }
}
