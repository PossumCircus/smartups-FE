import { useEffect, useState, Dispatch, SetStateAction } from 'react';

// Define the return type for the hook
type UseInfiniteScrollReturn = [boolean, Dispatch<SetStateAction<boolean>>];

/**
 * Custom hook to handle infinite scrolling.
 *
 * @param {() => void} cb - The callback function to be called when the user has scrolled to the bottom of the page.
 * @param {boolean} hasNextPageState - A state that indicates if there are more pages to load.
 * @returns {[boolean, Dispatch<SetStateAction<boolean>>]} - An array containing the fetching state and a function to set the fetching state.
 */
export default function useInfiniteScroll(cb: () => void, hasNextPageState: boolean): UseInfiniteScrollReturn {
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, offsetHeight } = document.documentElement;
            if (window.innerHeight + scrollTop >= offsetHeight) {
                setIsFetching(true);
            }
        };

        setIsFetching(true);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (isFetching && hasNextPageState) {
            cb();
        } else if (!hasNextPageState) {
            setIsFetching(false);
        }
    }, [isFetching, hasNextPageState, cb]);

    return [isFetching, setIsFetching];
}