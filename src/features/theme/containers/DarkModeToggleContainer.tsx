import DarkModeToggle from "../components/DarkModeToggle";
import React, { useState, ReactElement, useEffect } from "react";
import { WbSunnyIcon, DarkModeIcon } from "../../../styles/muiIcon";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { setThemeMode } from "../themeSlice";

const DarkModeToggleContainer: React.FC = () => {
  const [icon, setIcon] = useState<ReactElement>(<WbSunnyIcon />); // 아이콘 기본값
  const user = useSelector((state: RootState) => state.users); // redux 에서 user 정보 가져옴
  const themeMode = useSelector((state: any) => state.theme.themeMode); // redux 에서 thememode 정보 가져옴
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // 최초 로딩 시 로컬스토리지에 있는 테마로 변경
    const persistedThemeMode = themeMode;

    if (persistedThemeMode === "dark") {
      setIcon(<DarkModeIcon />);
    } else {
      setIcon(<WbSunnyIcon />);
    }
  }, [themeMode]);

  // 아이콘 클릭 시 선택한 아이콘으로 변경, 전역변수로 설정
  const toggleTheme = () => {
    const newMode = themeMode === "dark" ? "light" : "dark";
    const newIcon = newMode === "dark" ? <DarkModeIcon /> : <WbSunnyIcon />;

    setIcon(newIcon);

    if (!user || !user.entities || user.entities.length === 0) {
      // 비회원일 경우 로컬스토리지에 thememode 업데이트
      dispatch(setThemeMode(newMode));
    } else {
      // 회원일 경우 서버에 thememode 업데이트
      axios
        .patch(`${process.env.REACT_APP_USER_API_URL}/ChangeThemeMode/${user.entities[0]._id}`, {
          themeMode: newMode,
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch(setThemeMode(newMode));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return <DarkModeToggle toggleTheme={toggleTheme} icon={icon} />;
};

export default DarkModeToggleContainer;
