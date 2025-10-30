import Options from "./Options";
import Settings from "./Settings";
import { Leva } from "leva";
import DropZone from "./DropZone";
import DataDialog from "../dialogs/DataDialog";
import Views from "./Views";
import ShowData from "./ShowData";

const UI = () => {
  return (
    <>
      <DropZone />
      {/* <Options /> */}
      <Settings />
      <DataDialog />
      <Views />
      <ShowData />
      <div style={{ position: "fixed", top: 10, left: 10 }}>
        <Leva fill collapsed={true} />
      </div>
    </>
  );
};

export default UI;
