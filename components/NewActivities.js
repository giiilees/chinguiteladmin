import React from "react";

function financial(x) {
  return x ? Number.parseFloat(x).toFixed(2) : "0.00";
}

function NewActivities({
  date,
  title,
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
          flex: 2,
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
          {title != "Transfer" ? title : gain ? sender : receiver}
        </span>
        <span
          style={{
            fontSize: 12,
          }}
        >
          {message}
        </span>
      </div>

      <div
        style={{
          height: "100%",
          flex: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            fontSize: 17,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            lineHeight: 1,
            color: gain ? "green" : "red",
          }}
        >
          {gain ? "+ " + financial(amount) : "- " + financial(amount)}
        </span>
      </div>
    </div>
  );
}

export default NewActivities;
