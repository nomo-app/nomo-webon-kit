import React from "react";

export interface DialogContent {
  title: string;
  content: string;
}

interface DialogProps {
  content: DialogContent | null;
  handleClose: () => void;
}

const dialogStyles: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  overflow: "auto",
  cursor: "pointer", // Add cursor style to indicate clickability
};

const contentStyles: React.CSSProperties = {
  backgroundColor: "white",
  padding: 20,
  borderRadius: 4,
  wordWrap: "break-word", // Use wordWrap instead of overflowWrap
  maxHeight: "80vh", // Set a maximum height to allow scrolling within the dialog
  overflow: "auto", // Enable scrolling when the content exceeds the available height
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#ae9151",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};

const Dialog: React.FC<DialogProps> = ({ content, handleClose }) => {
  if (!content) {
    return null; // Return null when dialog is not open
  }

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      // Close the dialog only if the background element itself is clicked
      handleClose();
    }
  };

  return (
    <div style={dialogStyles} onClick={handleBackgroundClick}>
      <div style={contentStyles}>
        <h2>{content.title}</h2>
        <p>{content.content}</p>
        <div style={{ height: "7px" }} />
        <button style={buttonStyle} onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Dialog;
