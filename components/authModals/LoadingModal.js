import React from "react";
import ReactModal from "react-modal";

import styles from "../../styles/Loading.module.css";

function LoadingModal({}) {
  return (
    <ReactModal
      isOpen={true}
      className={styles.ReactModal__Content}
      overlayClassName={styles.ReactModal__Overlay}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <img
          src="/logodark.png"
          style={{
            width: 80,
            height: 80,
            objectFit: "contain",
          }}
        />
        <span
          style={{
            fontFamily: "SFP-Medium",
            fontSize: 20,
            marginTop: 20,
          }}
        >
          Chinguitel
        </span>
      </div>
    </ReactModal>
  );
}

export default LoadingModal;
