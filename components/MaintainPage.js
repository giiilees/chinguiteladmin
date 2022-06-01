import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Maintain.module.css";

function MaintainPage(props) {
  return (
    <div
      className={
        "flex flex-1 w-screen bg-scroll bg-no-repeat bg-cover flex-col justify-center items-center " +
        " " +
        styles.haillme
      }
    >
      <div
        className={
          "flex h-screen w-screen text-center bg-black px-[50px] bg-opacity-[0.4] flex-col justify-center items-center"
        }
      >
        <h3
          className={
            "text-white text-[35px] leading-[35px] mb-[10px] sm:text-[45px] "
          }
        >
          Maintenance mode is on
        </h3>
        <span
          className={
            "text-[16px] sm:text-[22px] leading-[20px] text-white opacity-[0.8] "
          }
        >
          Site will be available soon. Thank you for your patience!
        </span>
        <Link href="/about">
          <a
            className={
              "flex text-center h-[60px] sm:w-[250px] w-screen sm:rounded-[20px] sticky bottom-0 sm:mb-[50px] bg-white justify-center items-center"
            }
          >
            <span>More info</span>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default MaintainPage;
