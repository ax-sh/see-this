const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const validateFile = (file) => {
  const validTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/x-icon",
  ];
  if (validTypes.indexOf(file.type) === -1) {
    return null;
  }
  return file;
};

const handleFiles = async (files) => {
  const medias = [...files].map(validateFile).filter((x) => !!x);

  return Promise.all(medias.map((i) => toBase64(i)));
};

export default function DropZone({ onDrop }) {
  const dragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("dragOver");
  };
  const dragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("dragEnter");
  };
  const dragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("dragLeave");
  };
  const fileDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length) {
      const medias = await handleFiles(files);
      onDrop(medias);
    }
    console.log("fileDrop");
  };
  return (
    <div
      className="drop__zone"
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={fileDrop}
      style={{ width: "100%", height: "100%", flex: "1" }}
    ></div>
  );
}
