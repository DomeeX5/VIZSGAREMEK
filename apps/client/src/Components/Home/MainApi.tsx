import {fetchApiEndpoints} from "../Hooks/getFetchApi.tsx";

export const productsPerPage = 16;

export const fetchProductCount = async () => {
        const data = await fetchApiEndpoints('/api/products/count');
        return Math.round(data.totalCount / productsPerPage);
};

export const fetchProductsPerPage = async (page: number, limit: number) => {
    return await fetchApiEndpoints(`/api/products/all?page=${page}&limit=${limit}`);
};
