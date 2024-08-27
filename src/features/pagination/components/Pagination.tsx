import { Link } from "react-router-dom";
type PaginationPropsType = {
    totalPage: number;
    pageCountPerGroup: number;
    startingPage: number;
    currentPage: number
    noPrevPage: boolean
    noNextPage: boolean
}
export default function Pagination({
    totalPage,
    pageCountPerGroup,
    startingPage,
    currentPage,
    noPrevPage,
    noNextPage
}: PaginationPropsType) {
    return (
        <div className="flex justify-center items-center my-4 text-[#888] text-sm">
            <ul className="list-none flex flex-row">
                <li key="prev" className={`custom_pagination_li custom_pagination_move ${noPrevPage ? 'invisible' : ''}`}>
                    <Link to={`?page=${startingPage - 1}`} className="h-6 leading-6">이전</Link>
                </li>
                {[...Array(pageCountPerGroup)].map((_, i) =>
                    startingPage + i <= totalPage && (
                        <li key={startingPage + i}>
                            <Link
                                className={`mx-1 block cursor-pointer w-6 border-solid rounded-full text-center no-underline ${currentPage === startingPage + i ? 'font-bold bg-[#2f5d62] text-white' : ''}`}
                                to={`?page=${startingPage + i}`}>
                                {startingPage + i}
                            </Link>
                        </li>
                    )
                )}
                <li key="next" className={`custom_pagination_li custom_pagination_move ${noNextPage} ? invisible : ''`} >
                    <Link to={`?page=${startingPage + pageCountPerGroup}`}>다음</Link>
                </li>
            </ul>
        </div>
    )
}