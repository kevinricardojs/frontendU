import { Modal } from "@mui/material";
import React from "react";

export const ModalForm = ({
  children,
  open,
  handleClose,
  title,
  descripcion,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby={title}
      aria-describedby={descripcion}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Modal>
  );
};
