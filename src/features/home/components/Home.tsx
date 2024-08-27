import LeftAsideSection from "./LeftAsideSection/LeftAsideSection";
import RightAsideSection from "./RightAsideSection/RightAsideSection";
import MainContentsSection from "./MainContentsSection/MainContentSection";

export default function HomeCopy() {
  return (
    <div className="flex mx-auto mt-4 w-full max-w-[1280px] px-4 gap-3">
      <LeftAsideSection />
      <MainContentsSection />
      <RightAsideSection />
    </div>
  );
};