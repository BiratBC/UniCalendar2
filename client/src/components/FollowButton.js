import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const FollowButton = ({ profileUserId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const token = localStorage.getItem("token");

  const checkFollowing = async () => {
    const jwtToken = localStorage.getItem("token");
    console.log(isFollowing);

    if (!jwtToken) {
      setIsFollowing(false);
    }

    const response = await fetch(`http://localhost:5000/profile/followers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    if (!response.ok) {
      // console.log(response);
    }
    const data = await response.json();
    // console.log("Data from follow button", data);
    // console.log("profile id", profileUserId);
    // console.log(data[0].following_id);

    //no followers found
    if (!data || data.length === 0) {
      setIsFollowing(false);
      return;
    }

    if (data[0]?.following_id === profileUserId) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  };

  const handleFollow = async () => {
    const jwtToken = localStorage.getItem("token");
    console.log(isFollowing);

    if (!isFollowing) {
      try {
        const response = await fetch("http://localhost:5000/profile/follow", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({ following_id: profileUserId }),
        });
        const data = await response.json();
        if (!response.ok) {
          toast.error(data.message);
          if (data.message === "Login or authorization required") {
            window.location.href = "/login";
          }
        } else {
          setIsFollowing(true);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleUnfollow = async () => {
    const jwtToken = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/profile/unfollow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ following_id: profileUserId }),
      });
      if (response.ok) {
        setIsFollowing(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (profileUserId && token) {
      checkFollowing();
    }
  }, [profileUserId]);

  return isFollowing ? (
    <button className="btn btn-secondary" onClick={handleUnfollow}>
      Unfollow
    </button>
  ) : (
    <button className="btn btn-primary" onClick={handleFollow}>
      Follow
    </button>
  );
};

export default FollowButton;
