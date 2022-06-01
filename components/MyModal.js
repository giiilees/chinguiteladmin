import React from "react";
import ReactModal from "react-modal";
import { IoMdClose } from "react-icons/io";
import styles from "../styles/Header.module.css";

function MyModal({ title, modalVis, setModalVis, children }) {
  return (
    <ReactModal
      isOpen={modalVis}
      onRequestClose={() => setModalVis(false)}
      className={styles.ReactModal__Content}
      overlayClassName={styles.ReactModal__Overlay}
    >
      <div
        className={
          "flex h-[60px] px-[30px] w-[100%] items-center justify-center border-b-[1px] border-gray-300  "
        }
      >
        <div
          onClick={() => setModalVis(false)}
          className={
            "flex h-[30px] absolute left-[30px] self-left w-[30px] rounded-[25px] justify-center items-center bg-transparent hover:bg-[rgba(0,0,0,0.1)] "
          }
        >
          <IoMdClose color="rgba(0,0,0,0.8)" size="23px" />
        </div>
        <h1>{title}</h1>
      </div>
      <div
        className={"flex flex-1 w-[100%] px-[30px] flex-col overflow-y-scroll "}
      >
        {children}
      </div>
    </ReactModal>
  );
}

export default MyModal;
