import { Modal } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

export const ModalForm = ({ children, open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
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
ModalForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
