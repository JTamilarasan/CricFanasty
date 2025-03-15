import React from "react";

const ErrorModal = ({ message, onClose }) => {
  if (!message) return null; // Don't render if there's no error message

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 style={styles.title}>Error</h2>
        <p style={styles.message}>{message}</p>
        <button style={styles.button} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "10px", // Ensures spacing on mobile
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "15px", // Reduced padding for smaller screens
    borderRadius: "8px",
    textAlign: "center",
    width: "90%", // Makes it more mobile-friendly
    maxWidth: "350px", // Prevents too much width on desktop
    boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
  },
  title: {
    color: "red",
    fontSize: "20px", // Slightly smaller for better mobile readability
    marginBottom: "10px",
  },
  message: {
    fontSize: "14px", // Reduced for mobile readability
    marginBottom: "15px",
    wordWrap: "break-word",
  },
  button: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    width: "100%", // Full width on mobile
    maxWidth: "100px", // Fixed width for better desktop appearance
  },
};

export default ErrorModal;
