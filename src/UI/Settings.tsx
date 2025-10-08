import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";

const Settings = () => {
  return (
    <>
      <div id="settings" className="panel">
        <IconButton>
          <SettingsIcon fontSize={"large"} />
        </IconButton>
      </div>
    </>
  );
};

export default Settings;
