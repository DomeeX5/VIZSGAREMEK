import { fetchApiEndpoints } from "../Hooks/getFetchApi";

/**
 * The number of products to display per page.
 */
export const productsPerPage = 16;

/**
 * Fetches the total count of products from the API.
 * @returns The total number of pages based on the total count of products and the products per page.
 */
export const fetchProductCount = async (): Promise<number> => {
    const data = await fetchApiEndpoints('/api/products/count');
    return Math.round(data.totalCount / productsPerPage);
};

/**
 * Fetches a subset of products from the API based on the specified page and limit.
 * @param page - The page number of products to fetch.
 * @param limit - The maximum number of products to fetch per page.
 * @returns The list of products for the specified page.
 */
export const fetchProductsPerPage = async (page: number, limit: number): Promise<any> => {
    return await fetchApiEndpoints(`/api/products/all?page=${page}&limit=${limit}`);
};
