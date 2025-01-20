import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function GoogleLogin() {
  const handleSuccess = async (credentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential received");
      }
      const decoded = jwtDecode(credentialResponse.credential);

      const response = await fetch("http://localhost:5000/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential: credentialResponse.credential,
        }),
      });

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const data = await response.json();
      console.log("User authenticated:", data);
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <div>
      <h1>Sign in with Google</h1>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.error("Login Failed");
        }}
        useOneTap={false}
      />lo
    </div>
  );
}

export default GoogleLogin;
