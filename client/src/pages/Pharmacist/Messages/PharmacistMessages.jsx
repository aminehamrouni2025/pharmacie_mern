import React from "react";
import Chat from "../../../components/Landing/Chat";
import adminPhoto from "../../../assets/01.png";
const PharmacistMessages = () => {
  const currentUser = localStorage.getItem("id");
  const pharmacistName = localStorage.getItem("fullName");
  const adminId = "67d99dc032bcc90d3587c80a"; // Replace with real admin ID or fetch from API
  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#003e26" }}>
        Chat with an admin
      </h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <img src={adminPhoto} />
        <Chat
          currentUser={currentUser}
          receiverId={adminId}
          pharmacistName={pharmacistName}
        />
        ;
      </div>
    </div>
  );
};

export default PharmacistMessages;
