import React from "react";

function ActivityItem({
  title,
  message,
  profilePic,
  amount,
  received,
  rounded,
}) {
  return (
    <div
      className={!rounded ? "h-[75px] md:h-[100px] lg:h-[200px]" : "h-[65px]"}
      style={{
        display: "flex",
        width: "100%",
        borderRadius: rounded ? 11 : 0,

        padding: 5,
        borderBottomWidth: rounded ? 0 : 1,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: "white",
        flexDirection: "row",
        boxShadow: rounded ? "0px 0px 20px 1px rgba(0,0,0,0.1)" : "",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: rounded ? 10 : 0,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <img
          src={profilePic}
          style={{
            height: 40,
            width: 40,
            objectFit: "cover",
            borderRadius: 36,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",

            marginLeft: 10,
          }}
        >
          <span
            style={{
              fontWeight: "bold",
              fontSize: 18,
              lineHeight: "20px",
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontWeight: "normal",
              fontSize: 14,
              lineHeight: "14px",
              color: "rgba(0,0,0,0.8)",
            }}
          >
            {message}
          </span>
        </div>
      </div>
      <span style={{ color: received ? "green" : "red", fontWeight: "bold" }}>
        {received ? "+" + amount : "-" + amount}
      </span>
    </div>
  );
}

export default ActivityItem;
