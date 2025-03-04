import React, { useState, useEffect, useRef } from "react";

const NotificationBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isFetched = useRef(false);
  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    const jwtToken = localStorage.getItem("token");
    try {
      const response = await fetch(
        "http://localhost:5000/notifications/getNotification",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const data = await response.json();

      setNotifications((prevNotifications) => [...prevNotifications, ...data]);
      console.log(notifications);
    } catch (error) {
      console.error(error.message);
    }
  };
  const visitLink = async (notificationId) => {
    const jwtToken = localStorage.getItem("token");
    const id = notificationId;
    console.log(id);

    try {
      const updateNoti = await fetch(
        `http://localhost:5000/notifications/read-one/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const data = await updateNoti.json();
      console.log(data.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (!isFetched.current) {
      getNotifications();
      isFetched.current = true;
    }
  }, []);

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{ border: "none", backgroundColor: "rgb(248 249 250)" }}
        >
          <i
            className="fa fa-bell"
            aria-hidden="true"
            style={{
              fontSize: 24,
              color: "black",
              cursor: "pointer",
            }}
          ></i>
          {notifications.filter(notification => !notification.is_read).length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {notifications.filter(notification => !notification.is_read).length}
            </span>
          )}  
        </button>

        {isOpen && (
          <div
            className="position-absolute end-0 mt-2 shadow bg-white border rounded z-50"
            style={{ width: 400 }}
          >
            <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
              <h3 className="h6 mb-0">Notifications</h3>
              <button
                className="btn-close"
                onClick={() => setIsOpen(false)}
              ></button>
            </div>
            <div
              className="p-3"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              <ul className="list-unstyled mb-0">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => {
                    let notificationLink = "/";
                    if (notification.subject.includes("Event Created")) {
                      notificationLink = "/profile/manage-my-events";
                    } else if (notification.subject.includes("Registration Confirmed")) {
                      notificationLink = `/`;
                    }
                    return (
                      <>
                        <li
                          key={index}
                          className="p-2 rounded small mb-1"
                          style={{
                            backgroundColor: !notification.is_read
                              ? "#d6d8db"
                              : "#f8f9fa", // Light for read, darker for unread
                          }}
                        >
                          <a
                            href={notificationLink}
                            style={{ textDecoration: "none", color: "black" }}
                            onClick={() => {
                              visitLink(notification.id);
                            }}
                          >
                            <div
                              className="subject"
                              style={{ fontWeight: "bold" }}
                            >
                              {notification.subject}{" "}
                              {console.log(!notification.is_read)}
                            </div>
                            <div className="message">
                              {notification.message}{" "}
                            </div>
                          </a>
                        </li>
                      </>
                    );
                  })
                ) : (
                  <p className="small text-muted">No new notifications</p>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationBox;
