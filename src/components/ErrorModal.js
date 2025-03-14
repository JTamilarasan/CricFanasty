import React from "react";

const ErrorModal = ({ message }) => {
  if (!message) return null; // Don't render if there's no error message

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 style={styles.title}>Error</h2>
        <p style={styles.message}>{message}</p>
        <button style={styles.button} onClick={() => window.location.reload()}>
          Refresh
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
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    maxWidth: "400px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
  },
  title: {
    color: "red",
    fontSize: "22px",
  },
  message: {
    fontSize: "16px",
    marginBottom: "15px",
  },
  button: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default ErrorModal;
