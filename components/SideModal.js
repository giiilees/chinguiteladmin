import React from "react";
import ReactModal from "react-modal";
import { IoMdClose } from "react-icons/io";
import styles from "../styles/SideModal.module.css";

function SideModal({ title, modalVis, setModalVis, children }) {
  return (
    <ReactModal
      isOpen={modalVis}
      onRequestClose={() => setModalVis(false)}
      className={styles.ReactModal__Content}
      overlayClassName={styles.ReactModal__Overlay}
    >
      <div
        style={{
          boxShadow: "0px 0px 4px 2px rgba(0,0,0,0.1)",
        }}
        className={
          "flex h-[60px] px-[30px] w-[100%] items-center justify-center    "
        }
      >
        <div
          onClick={() => setModalVis(false)}
          className={
            "flex h-[30px] absolute left-[30px] self-left w-[30px] rounded-[25px] justify-center items-center bg-transparent hover:bg-[rgba(0,0,0,0.1)] "
          }
        >
          <IoMdClose color="rgba(0,0,0,0.6)" size="23px" />
        </div>
        <span
          style={{
            fontSize: 18,

            color: "rgba(0,0,0,0.6)",
            fontWeight: "bold",
            lineHeight: 1.2,
          }}
        >
          {title}
        </span>
      </div>
      <div className={"flex flex-1 w-[100%] flex-col overflow-y-scroll "}>
        {children}
      </div>
    </ReactModal>
  );
}

export default SideModal;
