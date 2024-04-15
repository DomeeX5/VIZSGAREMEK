/**
 * Represents the options for configuring the fetch request.
 */
interface Options {
    accessToken?: string | null; // Access token for authorization.
    method?: string; // HTTP method for the request (e.g., 'GET', 'POST').
    body?: any; // Data to be sent in the request body.
    jsonResponse?: boolean; // Indicates whether the response should be parsed as JSON (default: true).
}

/**
 * Sends a fetch request to the specified URL with optional configuration options.
 * @param fetchURL - The URL to send the fetch request to.
 * @param options - Configuration options for the fetch request.
 * @returns A Promise that resolves with the response data, or null if jsonResponse is false.
 * @throws Error if the fetch request fails or the response status is not ok.
 */
export async function fetchApiEndpoints(fetchURL: string, { accessToken, method, body, jsonResponse = true }: Options = {}): Promise<any> {
    try {
        // Set up headers for the request.
        const headers: { [key: string]: string } = {
            'Content-type': 'application/json',
        };

        // Add authorization header if access token is provided.
        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }

        // Set up request options.
        const requestOptions: RequestInit = {
            method,
            headers,
        };

        // Add request body if provided.
        if (body) {
            requestOptions.body = JSON.stringify(body);
        }

        // Send fetch request.
        const response = await fetch(fetchURL, requestOptions);

        // Check if response status is not ok.
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        // Parse response as JSON if jsonResponse is true.
        if (jsonResponse) {
            return await response.json();
        }

        // Return null if jsonResponse is false.
        return null;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Error fetching data');
    }
}
