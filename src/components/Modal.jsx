import React from "react";

const Modal = ({ isOpen, closeModal }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full overflow-auto bg-gray-900 bg-opacity-75 z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="relative p-4 w-full max-w-md m-auto">
        <div
          className="relative bg-white rounded-lg shadow-md px-5 pb-4"
          onClick={closeModal}
        >
          <button
            type="button"
            className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md p-2 text-xs"
            onClick={closeModal}
          >
            Close
          </button>
          {/* Your modal content here */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
