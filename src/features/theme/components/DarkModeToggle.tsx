import React, { ReactElement } from "react";

import { IconButton } from "../../../styles/mui/index";

interface DarkModeToggleProps {
  toggleTheme: () => void;
  icon: ReactElement;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ toggleTheme, icon }) => {
  //

  return (
    <div className="hidden sm:block relative">
      <IconButton onClick={toggleTheme} className="text-gray-500 p-2 rounded-md focus:outline-none">
        {icon}
      </IconButton>
    </div>
  );
};

export default DarkModeToggle;
