import React from "react";

const CustomWalletModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-body">
          <p>Do you want to open this page in the MetaMask app?</p>
        </div>
        <div className="custom-modal-footer">
          <button className="custom-modal-button confirm" onClick={onConfirm}>
            Confirm
          </button>
          <button className="custom-modal-button cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomWalletModal;
