import { useSearchParams } from "react-router-dom";

/**
 * Custom hook to get the value of a query parameter from the URL.
 *
 * @param {string} queryString - The name of the query parameter to retrieve.
 * @returns {string | null} - An string containing the value of the query parameter, or null if it does not exist.
 */

export default function useGetQuery(queryString: string): string | null {
    const [searchParams] = useSearchParams();
    const query = searchParams.get(queryString);
    return query;
}
