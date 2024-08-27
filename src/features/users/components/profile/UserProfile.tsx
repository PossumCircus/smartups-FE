import React from "react";
import { ButtonGroup, Button } from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

type UserProfileProps = {
  buttonState: string;
  stateHandler: (section: string) => void;
};

const UserProfile: React.FC<UserProfileProps> = ({ buttonState, stateHandler }) => {
  return (
    <section className="flex flex-col justify-center items-center divide-x-2 mt-8  ">
      <div className="flex h-[36rem] mt-2 relative">
        <section>
          <ButtonGroup aria-label="Basic button group" className="absolute left-0 -top-9">
            <Button variant={buttonState === "info" ? "contained" : "outlined"} onClick={() => stateHandler("info")}>
              내 정보
            </Button>
            <Button
              variant={buttonState === "history" ? "contained" : "outlined"}
              onClick={() => stateHandler("history")}
            >
              내 기록
            </Button>
          </ButtonGroup>
        </section>
        <div className={`w-[46rem] border-2 border-black  ${buttonState === "info" ? "bg-emerald-100" : "hidden"}`}>
          <ul className="flex flex-col items-center text-left space-y-8 w-full mt-6 h-auto">
            <li className="flex items-center">
              <div>
                <div className="relative">
                  {/* <Avatar alt="user avatar" src="/img/ping.png" sx={{ width: '9rem', height: '9rem', border: '3px solid white' }} /> */}
                  <PersonIcon />
                </div>
                <div className="flex justify-center items-center mt-2">닉네임</div>
              </div>
            </li>
            <li className="flex flex-col w-2/4">
              <div>
                내 소개
                <div className="border-2 border-black w-full h-40">내 소개 내용 여기에</div>
              </div>
            </li>
            <li>
              <Button variant="outlined">
                <Link to="/me/edit">계정 관리</Link>
              </Button>
            </li>
          </ul>
        </div>
        <div className={`w-[46rem] border-2 border-black ${buttonState === "history" ? "bg-slate-400" : "hidden"}`}>
          <div>가입 일자 : </div>
          <ul className="flex flex-col items-center text-left space-y-8 w-full mt-6 h-auto">
            <li className="flex space-x-5">
              <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button>작성 글 : { }개</Button>
                <Button>작성 댓글 : { }개</Button>
                <Button>좋아요 누른 글 : { } 개</Button>
                <Button>스크랩한 글 : { } 개</Button>
                <Button><Link to="/me/notification">받은 알림 : { } 개</Link></Button>
              </ButtonGroup>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
