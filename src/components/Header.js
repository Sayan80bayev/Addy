import React, { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { fetchNotifications } from "./api";
import { simplifyTimestamp } from "./adds/utils";
import { seenNotifications } from "./api";
const Header = () => {
  const [authorities, setAuthorities] = useState(null);
  const [token, setToken] = useState(null);
  const [notes, setNotes] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        try {
          const decodedToken = jwtDecode(storedToken);
          setAuthorities(decodedToken.authorities);
          setToken(storedToken);

          const response = await fetchNotifications(storedToken);
          if (!Array.isArray(response)) {
            throw new Error("Invalid notification response format");
          }
          setNotes(response);
        } catch (error) {
          console.error("Error fetching or processing notifications:", error);
          setNotes([]); // Clear notifications in case of error
        }
      }
    };

    fetchNotes(); // Fetch notes immediately when the component mounts
  }, [showNotifications]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthorities(null);
  };

  const handleMenu = () => {
    const el = document.querySelector(".navigation");
    el.classList.toggle("disable");
    const bars = document.querySelectorAll(".bar");
    if (el.classList.contains("disable")) {
      bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
      bars[1].style.opacity = "0";
      bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
    } else {
      bars[0].style.transform = "rotate(0) translate(0)";
      bars[1].style.opacity = "1";
      bars[2].style.transform = "rotate(0) translate(0)";
    }
  };

  useEffect(() => {
    // Close notifications when clicking outside
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleBellClick = async () => {
    setShowNotifications((prev) => !prev);
    seenNotifications(token, notes);
  };

  return (
    <>
      <header>
        <nav>
          <div>
            <img src={process.env.PUBLIC_URL + "/Addy (1).png"} alt="Addy" />
            <button className="menu-button" onClick={handleMenu}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
            <div className="navigation">
              <a href="/">My Website</a>
              <a href="/index">Home</a>
              <a href="/newAdd">New add</a>
              {authorities && <a href="/profile">Profile</a>}
              {authorities === "ADMIN" && (
                <a href="/catControll">Controll categories</a>
              )}
              {authorities ? (
                <>
                  <button className="btn-no-style" onClick={handleLogout}>
                    <a href="/login?out">Logout</a>
                  </button>
                  <button className="btn-no-style" onClick={handleBellClick}>
                    <svg
                      className="bell-icon"
                      height="20px"
                      width="20px"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 611.999 611.999"
                      xmlSpace="preserve"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <g>
                            <g>
                              <path d="M570.107,500.254c-65.037-29.371-67.511-155.441-67.559-158.622v-84.578c0-81.402-49.742-151.399-120.427-181.203C381.969,34,347.883,0,306.001,0c-41.883,0-75.968,34.002-76.121,75.849c-70.682,29.804-120.425,99.801-120.425,181.203v84.578c-0.046,3.181-2.522,129.251-67.561,158.622c-7.409,3.347-11.481,11.412-9.768,19.36c1.711,7.949,8.74,13.626,16.871,13.626h164.88c3.38,18.594,12.172,35.892,25.619,49.903c17.86,18.608,41.479,28.856,66.502,28.856c25.025,0,48.644-10.248,66.502-28.856c13.449-14.012,22.241-31.311,25.619-49.903h164.88c8.131,0,15.159-5.676,16.872-13.626C581.586,511.664,577.516,503.6,570.107,500.254z M484.434,439.859c6.837,20.728,16.518,41.544,30.246,58.866H97.32c13.726-17.32,23.407-38.135,30.244-58.866H484.434z M306.001,34.515c18.945,0,34.963,12.73,39.975,30.082c-12.912-2.678-26.282-4.09-39.975-4.09s-27.063,1.411-39.975,4.09C271.039,47.246,287.057,34.515,306.001,34.515z M143.97,341.736v-84.685c0-89.343,72.686-162.029,162.031-162.029s162.031,72.686,162.031,162.029v84.826c0.023,2.596,0.427,29.879,7.303,63.465H136.663C143.543,371.724,143.949,344.393,143.97,341.736z M306.001,577.485c-26.341,0-49.33-18.992-56.709-44.246h113.416C355.329,558.493,332.344,577.485,306.001,577.485z"></path>
                              <path d="M306.001,119.235c-74.25,0-134.657,60.405-134.657,134.654c0,9.531,7.727,17.258,17.258,17.258c9.531,0,17.258-7.727,17.258-17.258c0-55.217,44.923-100.139,100.142-100.139c9.531,0,17.258-7.727,17.258-17.258C323.259,126.96,315.532,119.235,306.001,119.235z"></path>
                            </g>
                          </g>
                        </g>
                      </g>{" "}
                    </svg>
                  </button>
                  {notes.length > 0 && (
                    <>
                      <p className="notes-quantity">{notes.length}</p>
                    </>
                  )}
                </>
              ) : (
                <a href="/login">Login</a>
              )}
            </div>
          </div>
        </nav>
      </header>
      {showNotifications && ( // Conditional rendering based on showNotifications and notes
        <div className="notification-menu" ref={notificationRef}>
          <h4>Notifications</h4>
          <hr />
          {notes.length > 0 ? (
            notes.map((note, index) => (
              <div key={index}>
                <p>{note.value}</p>
                <p>{simplifyTimestamp(note.date)}</p>
              </div>
            ))
          ) : (
            <p>No notifications yet</p> // Show loading message
          )}
        </div>
      )}
    </>
  );
};

export default Header;
