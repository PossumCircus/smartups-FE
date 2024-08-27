import { useState, useEffect } from "react";
import { PaginationOptionsDataType } from "../../../types/commonType";
import Pagination from "../components/Pagination";
export default function PaginationContainer({ totalPage, pageCountPerGroup, currentPage }: Omit<PaginationOptionsDataType, "itemCountPerPage">) {
    //totalPage: 전체 페이지 수, pageCountPerGroup : 한 묶음당 보여줄 페이지 수, currentPage : 현재 페이지

    const [startingPage, setStartingPage] = useState(1); //각 페이지 그룹의 가장 첫 번째 페이지(가장 좌측)
    const noPrevPage = startingPage === 1;
    const noNextPage = startingPage + pageCountPerGroup - 1 >= totalPage; // startingPage + pageCountPerGroup - 1 => 현재 페이지 그룹의 마지막 페이지가 totalPages보다 크거나 같은 경우에만 다음 버튼을 비활성

    useEffect(() => {
        if (currentPage === startingPage + pageCountPerGroup) setStartingPage(prev => prev + pageCountPerGroup); // 다음 누를 때 마다 startingPage 최신화(1->6->11)
        if (currentPage < startingPage) setStartingPage(prev => prev - pageCountPerGroup); // 이전 누를 때 마다 startingPage 최신화(11->6->1)
    }, [currentPage, pageCountPerGroup, startingPage])

    return (
        <Pagination
            totalPage={totalPage}
            pageCountPerGroup={pageCountPerGroup}
            startingPage={startingPage}
            currentPage={currentPage}
            noPrevPage={noPrevPage}
            noNextPage={noNextPage}
        />
    )
}