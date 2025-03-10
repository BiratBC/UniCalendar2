import React, { useState, useEffect } from "react";
import Dashboard from "./Profile";
import defaultImg from "../images/default.jpg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function UserDetails() {
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
        setMode("readOnly")
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
      <Dashboard />
      <div className="hostContainer">
        <h1>User-Details</h1>
        <hr />

        <section>
          <div className="userPhoto">
            <h3>Profile Photo</h3>
            <div className="Photo" style={{ marginTop: 20 }}>
              <div className="profile-picture">
                {/* <i className="fa fa-user-circle-o" style={{fontSize : 248, opacity : 0.85}}></i> */}
                <img src={image} alt="user-photo" />
                <input
                  className="file-uploader"
                  type="file"
                  id="img"
                  onChange={upload}
                  accept="image/*"
                />
              </div>
              <label for="img" style={{ cursor: "pointer", marginTop: 0 }}>
                <span>
                  <i className="fa fa-camera" style={{ fontSize: 30 }}></i>
                </span>
              </label>
            </div>
          </div>
        </section>
        <div
          className="save-btn"
          style={{
            marginTop: 1,
            width: 250,
            display: "flex",
            justifyContent: "right",
          }}
        >
          <button className="btn btn-primary btn-sm" style={{}}>
            Save
          </button>
        </div>
        <section style={{ marginTop: 70 }}>
          <div className="userInformation">
            <h3>User Information</h3>
            <div className="contactDetails">
              <div>
                <div>
                  <label htmlFor="">First Name</label>
                </div>
                <div>
                  <input
                    type="text"
                    value={userData.firstName}
                    readOnly={mode === "readOnly"}
                    name="firstName"
                    onChange={handleOnChange}
                  />
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="">Last Name</label>
                </div>
                <div>
                  <input
                    type="text"
                    value={userData.lastName}
                    readOnly={mode === "readOnly"}
                    name="lastName"
                    onChange={handleOnChange}
                  />
                </div>
              </div>
            </div>
            <div className="contactDetails">
              <div>
                <div>
                  <label htmlFor="">Gender</label>
                </div>
                <div>
                  <select
                    name="gender"
                    id="gender"
                    value={userData.gender ? userData.gender : ""}
                    readOnly={mode === "readOnly"}
                    onChange={handleOnChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="contactDetails">
              <div>
                <div>
                  <label htmlFor="">Email</label>
                </div>
                <div>
                  <input
                    type="text"
                    value={userData.email}
                    readOnly={mode === "readOnly"}
                    onChange={handleOnChange}
                    name="email"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="">Phone Number</label>
                </div>
                <div>
                  <input
                    type="text"
                    value={userData.phoneNumber}
                    readOnly={mode === "readOnly"}
                    onChange={handleOnChange}
                    name="phoneNumber"
                  />
                </div>
              </div>
            </div>
            <div className="contactDetails">
              <div>
                <div>
                  <label htmlFor="">Position</label>
                </div>
                <div>
                  <input
                    type="text"
                    value={userData.userPosition ? userData.userPosition : ""}
                    readOnly={mode === "readOnly"}
                    onChange={handleOnChange}
                    name="userPosition"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="">Club/Organization</label>
                </div>
                <div>
                  <input
                    type="text"
                    value={userData.userClub ? userData.userClub : ""}
                    readOnly={mode === "readOnly"}
                    onChange={handleOnChange}
                    name="userClub"
                  />
                </div>
              </div>
            </div>
            <div className="contactDetails">
              <div>
                <div>
                  <label htmlFor="">Address</label>
                </div>
                <div>
                  <input
                    type="text"
                    value={userData.userAddress ? userData.userAddress : ""}
                    readOnly={mode === "readOnly"}
                    onChange={handleOnChange}
                    name="userAddress"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="">City</label>
                </div>
                <div>
                  <input
                    type="text"
                    value={userData.userCity ? userData.userCity : ""}
                    readOnly={mode === "readOnly"}
                    onChange={handleOnChange}
                    name="userCity"
                  />
                </div>
              </div>

              <div>
                <div>
                  <label htmlFor="">Country</label>
                </div>
                <div>
                  <select
                    name="userCountry"
                    id="countries"
                    value={userData.userCountry ? userData.userCountry : ""}
                    readOnly={mode === "readOnly"}
                    onChange={handleOnChange}
                  >
                    <option value="United States">United States</option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antartica">Antarctica</option>
                    <option value="Antigua and Barbuda">
                      Antigua and Barbuda
                    </option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bosnia and Herzegowina">
                      Bosnia and Herzegowina
                    </option>
                    <option value="Botswana">Botswana</option>
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Territory">
                      British Indian Ocean Territory
                    </option>
                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">
                      Central African Republic
                    </option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos Islands">
                      Cocos (Keeling) Islands
                    </option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="Congo">
                      Congo, the Democratic Republic of the
                    </option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                    <option value="Croatia">Croatia (Hrvatska)</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">
                      Dominican Republic
                    </option>
                    <option value="East Timor">East Timor</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands">
                      Falkland Islands (Malvinas)
                    </option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="France Metropolitan">
                      France, Metropolitan
                    </option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern Territories">
                      French Southern Territories
                    </option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-Bissau">Guinea-Bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Heard and McDonald Islands">
                      Heard and Mc Donald Islands
                    </option>
                    <option value="Holy See">
                      Holy See (Vatican City State)
                    </option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran">Iran (Islamic Republic of)</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Democratic People's Republic of Korea">
                      Korea, Democratic People's Republic of
                    </option>
                    <option value="Korea">Korea, Republic of</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Lao">
                      Lao People's Democratic Republic
                    </option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libyan Arab Jamahiriya">
                      Libyan Arab Jamahiriya
                    </option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macau">Macau</option>
                    <option value="Macedonia">
                      Macedonia, The Former Yugoslav Republic of
                    </option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia">
                      Micronesia, Federated States of
                    </option>
                    <option value="Moldova">Moldova, Republic of</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Netherlands Antilles">
                      Netherlands Antilles
                    </option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Northern Mariana Islands">
                      Northern Mariana Islands
                    </option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn">Pitcairn</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Reunion">Reunion</option>
                    <option value="Romania">Romania</option>
                    <option value="Russia">Russian Federation</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saint Kitts and Nevis">
                      Saint Kitts and Nevis
                    </option>
                    <option value="Saint Lucia">Saint LUCIA</option>
                    <option value="Saint Vincent">
                      Saint Vincent and the Grenadines
                    </option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe">
                      Sao Tome and Principe
                    </option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia (Slovak Republic)</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia">
                      South Georgia and the South Sandwich Islands
                    </option>
                    <option value="Span">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="St. Helena">St. Helena</option>
                    <option value="St. Pierre and Miguelon">
                      St. Pierre and Miquelon
                    </option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Svalbard">
                      Svalbard and Jan Mayen Islands
                    </option>
                    <option value="Swaziland">Swaziland</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syria">Syrian Arab Republic</option>
                    <option value="Taiwan">Taiwan, Province of China</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Tanzania">
                      Tanzania, United Republic of
                    </option>
                    <option value="Thailand">Thailand</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau">Tokelau</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad and Tobago">
                      Trinidad and Tobago
                    </option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks and Caicos">
                      Turks and Caicos Islands
                    </option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">
                      United Arab Emirates
                    </option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States Minor Outlying Islands">
                      United States Minor Outlying Islands
                    </option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Vietnam">Viet Nam</option>
                    <option value="Virgin Islands (British)">
                      Virgin Islands (British)
                    </option>
                    <option value="Virgin Islands (U.S)">
                      Virgin Islands (U.S.)
                    </option>
                    <option value="Wallis and Futana Islands">
                      Wallis and Futuna Islands
                    </option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                  </select>
                </div>
              </div>
            </div>
            {/* TODO : add text area to add tags from user like : music, sports, etc */}
            {/* <div className="tag-area">

            </div> */}
            <div
              className="buttons"
              style={{ display: "flex", gap: 40, position: "relative" }}
            >
              {mode === "readOnly" ? (
                <>
                  <button
                    className="btn btn-primary"
                    style={{ width: 100 }}
                    onClick={() => setMode("edit")}
                  >
                    Edit
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-success"
                    style={{ width: 100 }}
                    onClick={() => {
                      handleConfirm(userData.user_id);
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    className="btn btn-secondary"
                    style={{ width: 100 }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default UserDetails;
