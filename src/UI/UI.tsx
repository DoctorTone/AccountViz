import Options from "./Options";
import Settings from "./Settings";
import { Leva } from "leva";
import DropZone from "./DropZone";

const UI = () => {
  return (
    <>
      <DropZone />
      <Options />
      <Settings />
      <div style={{ position: "fixed", top: 10, left: 10 }}>
        <Leva fill collapsed={true} />
      </div>
    </>
  );
};

export default UI;
