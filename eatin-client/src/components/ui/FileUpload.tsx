import "./FileUpload.css";

import { Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { FC } from "react";

interface Props {
  onUploadFile: (file: File) => void;
}

export const FileUpload: FC<Props> = ({ onUploadFile }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const files = Array.prototype.slice.call(e.target.files);
    files.map(onUploadFile);
  };

  return (
    <Button
      className="file-upload-button"
      component="label"
      variant="contained"
      startIcon={<UploadFileIcon />}
    >
      Upload Media
      <input type="file" multiple hidden onChange={onChange} />
    </Button>
  );
};
