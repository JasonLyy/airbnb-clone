import React from "react";
import Modal from "@material-ui/core/Modal";
import AuthForm from "./AuthForm";
import { SelectedAuth } from "./const";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  selectedAuth: SelectedAuth;
}

const AuthModal: React.FC<AuthModalProps> = ({
  selectedAuth,
  open,
  onClose,
}) => {
  return (
    <>
      <Modal open={open} onClose={onClose}>
        {/* todo: hack to fix this error. look into later https://github.com/mbrn/material-table/issues/677 */}
        <span>
          <AuthForm onCloseClick={onClose} selectedAuth={selectedAuth} />
        </span>
      </Modal>
    </>
  );
};

export default AuthModal;
