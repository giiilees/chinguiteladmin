import React from "react";

function NewActivitiesNotify({
  date,
  month,
  year,
  message,
  amount,
  gain,
  receiver,
  sender,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        minHeight: 60,
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: 70,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            fontSize: 16,
            lineHeight: 1,
          }}
        >
          {date}
        </span>
        <span
          style={{
            fontSize: 12,
          }}
        >
          {month + ", " + year}
        </span>
      </div>
      <div
        style={{
          height: "100%",
          flex: 6,
          display: "flex",
          justifyContent: "center",

          flexDirection: "column",
        }}
      >
        <span
          style={{
            fontSize: 17,
            lineHeight: 1,
          }}
        >
          {gain ? sender : receiver}
        </span>
        <span
          style={{
            fontSize: 12,
          }}
        >
          {message}
        </span>
      </div>
    </div>
  );
}

export default NewActivitiesNotify;
