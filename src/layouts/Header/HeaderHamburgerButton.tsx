import { Box, Divider } from "../../styles/mui/index";
import { HomeIcon, Groups, QuestionMark } from "../../styles/muiIcon/index";
import routes from "../../constants/routes";
import BoardNav from "../../features/home/components/LeftAsideSection/BoardNav";

interface HeaderHamburgerButtonProps {
  toggleDrawer: (newOpen: boolean) => () => void;
}

export default function HeaderHamburgerButton({ toggleDrawer } : HeaderHamburgerButtonProps){
  return (
    <div>
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <div>
          <div className="flex items-center justify-between p-4">
            <p className="font-bold text-2xl">
              <span>Smart</span>
              <span className="text-green-500">Up</span>
            </p>
          </div>
          <Divider />
          <div className="flex justify-center my-4">
            <nav className="w-full space-y-3">
              <ul>
                <BoardNav to={routes.home} icon={<HomeIcon />} label="홈" iconColor="#0091ea" />
                <BoardNav to={routes.community} icon={<Groups />} label="커뮤니티" iconColor="#ff9800" />
                <BoardNav to={routes.qna} icon={<QuestionMark />} label="Q&A" iconColor="#f44336" />
              </ul>
            </nav>
          </div>
        </div>
      </Box>
    </div>
  );
};