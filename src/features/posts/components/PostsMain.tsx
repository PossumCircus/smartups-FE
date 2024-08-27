import {
  Banner,
  PostsListContainer,
  PostsTopicNav,
} from "./index";
import PaginationContainer from "../../pagination/containers/PaginationContainer";
import { PaginationOptionsDataType } from "../../../types/commonType";

interface PostsListPropsType {
  isInfinite: boolean;
  paginationOptions: PaginationOptionsDataType;
  category: string;
  categoryDescription: string;
  navPaths: { path: string; section: string }[];
  topic: string;
  handleWriteClick: () => void;
}

export default function PostsMain({
  category,
  categoryDescription,
  navPaths,
  paginationOptions,
  isInfinite,
  topic,
  handleWriteClick,
}: PostsListPropsType) {
  return (
    <div className="communityHome flex flex-row mt-4 mx-4 space-x-4 max-md:mx-8 max-lg:justify-between lg:justify-center">
      <div className="middleSection-post flex flex-col max-lg:w-full lg:w-[50dvw] ">
        <header>
          <Banner category={category} categoryDescription={categoryDescription} />
        </header>
        <nav className="divide-y-2">
          <PostsTopicNav navPaths={navPaths} topic={topic} handleWriteClick={handleWriteClick} />
        </nav>
        <section className="">
          <PostsListContainer
            category={category}
            itemCountPerPage={paginationOptions.itemCountPerPage}
            currentPage={paginationOptions.currentPage}
            isInfinite={isInfinite}
            topic={topic}
          />
        </section>
        {/* pagination OR infinite scroll */}
        {!isInfinite && (
          <div>
            <PaginationContainer
              totalPage={paginationOptions.totalPage}
              pageCountPerGroup={paginationOptions.pageCountPerGroup}
              currentPage={paginationOptions.currentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};