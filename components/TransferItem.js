import React, { useContext } from "react";
import AuthContext from "../auth/context";

function TransferItem({ item }) {
  const { user, setUser } = useContext(AuthContext);
  return (
    <div
      style={{
        display: "flex",
        height: 50,
        width: "100%",
        flexDirection: "row",
        padding: 5,
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          backgroundColor: "rgba(0,30,50,0.35)",
          height: 35,
          width: 35,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "rgba(250,250,255,0.9)",
            fontFamily: "SFP-SemiBold",
            fontSize: 15,
            margin: 5,
          }}
        >
          {item.transaction.from == user.data.wallet
            ? item.transaction.toName.charAt(0).toUpperCase()
            : item.transaction.fromName.charAt(0).toUpperCase()}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          marginLeft: 10,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 3,
        }}
      >
        <div
          style={{
            display: "flex",
            height: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: 4,
          }}
        >
          <span
            style={{
              fontFamily: "SFP-Regular",
              lineHeight: 0.85,
              fontSize: 14,
            }}
          >
            {item.transaction.from == user.data.wallet
              ? item.transaction.toName
              : item.transaction.fromName}
          </span>
          <span
            style={{
              fontFamily: "SFP-Regular",
              lineHeight: 0.85,
              fontSize: 14,
              color:
                item.transaction.from == user.data.wallet
                  ? "rgba(200,0,0,0.7)"
                  : "rgba(0,200,0,0.7)",
            }}
          >
            {item.transaction.from == user.data.wallet
              ? "-" + item.transaction.amount + " €"
              : "+" + item.transaction.amount + " €"}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            height: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <span
            style={{
              fontFamily: "SFP-Regular",
              lineHeight: 0.85,
              color: "rgba(0,0,0,0.5)",
              fontSize: 13,
            }}
          >
            {item.transaction.message}
          </span>
          <span
            style={{
              fontFamily: "SFP-Regular",
              lineHeight: 0.85,
              fontSize: 13,
              color: "rgba(0,0,0,0.5)",
            }}
          >
            {item.transaction.timestamp}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TransferItem;
