import Typography from "@mui/material/Typography";
import useStore from "../state/store";

const DropZone = () => {
  const loadCSVFile = useStore((state) => state.loadCSVFile);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      loadCSVFile(newFiles[0]);
    }
  };

  return (
    <div
      id="dropZone"
      className="panel"
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      <Typography variant="h5">Drag your file here.</Typography>
      <input type="file" id="fileInput" accept=".csv" />
    </div>
  );
};

export default DropZone;
