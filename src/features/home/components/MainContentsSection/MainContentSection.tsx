import InfiniteScroll from "../../../pagination/containers/InfiniteScrollContainer";

export default function MainContentsSection() {
  return (
    <section className="grow gap-y-10 pb-10 ">
      <div className="container">
        <article className="flex flex-col gap-1">
          <InfiniteScroll />
        </article>
      </div>
    </section>
  );
};