import Typography from "@mui/material/Typography";

const DropZone = () => {
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      console.log("new files = ", newFiles[0]);
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
