import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import defaultImg from "../images/default.jpg";
const HostDetails = () => {
  const [image, setImage] = useState(defaultImg);
  const [originalUserData, setOriginalUserData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phoneNumber: "",
    userPosition: "",
    userClub: "",
    userAddress: "",
    userCity: "",
    userCountry: "",
  });
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phoneNumber: "",
    userPosition: "",
    userClub: "",
    userAddress: "",
    userCity: "",
    userCountry: "",
  });
  const [mode, setMode] = useState("readOnly");

  const changeMode = () => {
    console.log(mode);

    if (mode === "readOnly") {
      setMode("");
    }
    console.log(mode);
  };

  const upload = (e) => {
    const file = e.target.files[0];
    // console.log(e.target.files);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // Set the base64 image string
      };
      reader.readAsDataURL(file); // Convert image file to a base64 string
    }
  };

  const getUserData = async (req, res) => {
    try {
      const jwtToken = localStorage.getItem("token");
      if (!jwtToken) throw new Error("Token not found");

      const user = await fetch("http://localhost:5000/profile/userDetails", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const jsonData = await user.json();
      // console.log(jsonData);

      setUserData({
        firstName: jsonData.first_name,
        lastName: jsonData.last_name,
        gender: jsonData.gender,
        email: jsonData.user_email,
        phoneNumber: jsonData.phone_number,
        userAddress: jsonData.address,
        userPosition: jsonData.position,
        userCity: jsonData.city,
        userClub: jsonData.club,
        userCountry: jsonData.country,
      });
      setOriginalUserData({
        firstName: jsonData.first_name,
        lastName: jsonData.last_name,
        gender: jsonData.gender,
        email: jsonData.user_email,
        phoneNumber: jsonData.phone_number,
        userAddress: jsonData.address,
        userPosition: jsonData.position,
        userCity: jsonData.city,
        userClub: jsonData.club,
        userCountry: jsonData.country,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  //onchange input
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  //Confirm edit
  const handleConfirm = async () => {
    const jwtToken = localStorage.getItem("token");
    try {
      const editDetail = await fetch(
        "http://localhost:5000/profile/update-detail",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(userData),
        }
      );

      if (editDetail.ok) {
        toast.success("Details updated successfully");
        setMode("readOnly");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Error while updating details.");
    }
  };

  //Cancel edit :
  const handleCancel = () => {
    setUserData({
      firstName: originalUserData.firstName,
      lastName: originalUserData.lastName,
      gender: originalUserData.gender,
      email: originalUserData.email,
      phoneNumber: originalUserData.phoneNumber,
      userAddress: originalUserData.userAddress,
      userCity: originalUserData.userCity,
      userClub: originalUserData.userClub,
      userPosition: originalUserData.userPosition,
      userCountry: originalUserData.userCountry,
    });
    setMode("readOnly");
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="container" style={{ marginTop: 100 }}>
        <h1>Host-Details</h1>
        <hr />

        <div className="userPhoto">
          <div className="Photo" style={{ marginTop: 20 }}>
            <div class="profile-picture">
              {/* <i className="fa fa-user-circle-o" style={{fontSize : 248, opacity : 0.85}}></i> */}
              <img src={image} alt="user-photo" />
            </div>
          </div>
        </div>
        <div style={{ marginTop: 70 }}></div>
      </div>
    </>
  );
};

export default HostDetails;
