import React from "react";
import Modal from "@material-ui/core/Modal";
import LoginForm from "./LoginForm";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  return (
    <>
      <Modal open={open} onClose={onClose}>
        {/* todo: hack to fix this error. look into later https://github.com/mbrn/material-table/issues/677 */}
        <span>
          <LoginForm onCloseClick={onClose} />
        </span>
      </Modal>
    </>
  );
};

export default LoginModal;
