import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { subscribe, unsubscribe } from "../api";
import { jwtDecode } from "jwt-decode";
import { simplifyTimestamp } from "./utils"; // Separate utility functions
import BellButton from "./BellButton";
export default function Adds({ advertisements }) {
  const [activeSubscriptions, setActiveSubscriptions] = useState([]);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setEmail(jwtDecode(token)?.sub);
      setToken(token);
    }
  }, []);
  const [changed, setChanged] = useState();
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const response = await axios.get("http://localhost:3001/subs", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const subscriptionsWithStatus = response.data.map((sub) => ({
          ...sub,
          isSubscribed: true,
        }));
        setActiveSubscriptions(subscriptionsWithStatus);
        if (changed) setChanged(false);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchSubscriptions();
  }, [email, changed]);
  const handleBellClick = async (e, advertisementId) => {
    e.stopPropagation();
    const isSubscribed =
      activeSubscriptions.filter(
        (sub) => sub.advertisement_id === advertisementId
      ).length > 0;
    try {
      if (isSubscribed) {
        await unsubscribe(email, advertisementId, token);
        setActiveSubscriptions((prevSubs) =>
          prevSubs.filter((id) => id !== advertisementId)
        );
      } else {
        await subscribe(email, advertisementId, token);
        setActiveSubscriptions((prevSubs) => [...prevSubs, advertisementId]);
      }
    } catch (error) {
      console.error("Error handling subscription:", error);
    }
    setChanged(true);
  };
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "...";
    }
    return text;
  }
  return (
    <div className="ctn">
      {advertisements.map((advertisement) => {
        const isSubscribed =
          activeSubscriptions.filter(
            (sub) => sub.advertisement_id === advertisement.id
          ).length > 0;

        return (
          <div key={advertisement.id} className="card-ctn">
            <div className="card add">
              {advertisement.images.length > 0 ? (
                <img
                  src={`data:image/jpeg;base64,${advertisement.images[0].imageData}`}
                  alt="First Image"
                />
              ) : (
                <img
                  src={process.env.PUBLIC_URL + "/empty.jpg"}
                  alt={advertisement.title}
                />
              )}
              <div className="card-info">
                <h5 key={advertisement.id}>
                  <Link
                    to={"/view/" + advertisement.id}
                    className="link_to_full"
                  >
                    {advertisement.title}
                  </Link>
                  {token && email !== advertisement.email && (
                    <BellButton
                      className={`bell ${
                        isSubscribed ? "active" : "not-subscribed"
                      }`}
                      onClick={(e) => handleBellClick(e, advertisement.id)}
                    ></BellButton>
                  )}
                </h5>
                <p className="price">
                  <b>{advertisement.price}</b>
                </p>
                <p>{advertisement.category.category_name}</p>
                <p style={{ display: "flex", justifyContent: "space-between" }}>
                  <small>{simplifyTimestamp(advertisement.date)}</small>
                  <div className="views">
                    <img
                      className="rec_icon"
                      src={process.env.PUBLIC_URL + "/view-eye-svgrepo-com.png"}
                      alt="Views Icon"
                    />
                    <h6 style={{ display: "block" }}>{advertisement.views}</h6>
                  </div>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
