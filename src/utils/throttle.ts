/**
 * Creates a throttled function that only invokes `cb` at most once per every `wait` milliseconds.
 *
 * @param {() => void} cb - The callback function to throttle.
 * @param {number} wait - The number of milliseconds to wait before allowing `cb` to be invoked again.
 * @returns {() => void} - The throttled function.
 */
export default function throttle(cb: () => void, wait: number): () => void {
    let timer: NodeJS.Timeout | null = null;

    return () => {
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                cb();
            }, wait);
        }
    };
}
