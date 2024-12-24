import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import SearchBar from "./SeacrhBar";
import CategoryBar from "./CategoryBar";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const location = useLocation();
  const [message, setMessage] = useState(location?.state?.message || null);

  useEffect(() => {
    // Clear the history state after setting the message
    window.history.replaceState({}, "");
  }, []);
  

  return (
    <>
      <h1 className="name_of_comp">
        Addy <h2>Buy anything you can find!</h2>
      </h1>


      <main>
        {message &&
          (message?.status == "success" ? (
            <div
              class="alert alert-warning rounded-md custom-alert-green"
              style={{ padding: "7px", height: "60px" }}
            >
              <div>
                <h6 class="mb-0.5 flex items-center gap-2 text-base uppercase sm:mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 256 256"
                  >
                    <g
                      fill="#00ff00"
                      fillRule="nonzero"
                      stroke="none"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit="10"
                      strokeDasharray=""
                      strokeDashoffset="0"
                      fontFamily="none"
                      fontWeight="none"
                      fontSize="none"
                      textAnchor="none"
                      style={{ mixBlendMode: "normal" }}
                    >
                      <g transform="scale(5.12,5.12)">
                        <path d="M41.9375,8.625c-0.66406,0.02344 -1.27344,0.375 -1.625,0.9375l-18.8125,28.78125l-12.1875,-10.53125c-0.52344,-0.54297 -1.30859,-0.74609 -2.03125,-0.51953c-0.71875,0.22266 -1.25391,0.83203 -1.37891,1.57422c-0.125,0.74609 0.17578,1.49609 0.78516,1.94531l13.9375,12.0625c0.4375,0.37109 1.01563,0.53516 1.58203,0.45313c0.57031,-0.08594 1.07422,-0.41016 1.38672,-0.89062l20.09375,-30.6875c0.42969,-0.62891 0.46484,-1.44141 0.09375,-2.10547c-0.37109,-0.66016 -1.08594,-1.05469 -1.84375,-1.01953z" />
                      </g>
                    </g>
                  </svg>
                  SUCCESS
                </h6>{" "}
                <div class="text-sm leading-normal sm:text-base">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          ) : (
            <div
              class="alert alert-warning rounded-md custom-alert-red"
              style={{ padding: "7px", height: "60px" }}
            >
              <div>
                <h6 class="mb-0.5 flex items-center gap-2 text-base uppercase sm:mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    class="text-lg sm:text-2xl iconify iconify--uis"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m22.7 17.5l-8.1-14c-.8-1.4-2.7-1.9-4.1-1.1c-.5.3-.9.7-1.1 1.1l-8.1 14c-.8 1.4-.3 3.3 1.1 4.1c.5.3 1 .4 1.5.4H20c1.7 0 3-1.4 3-3c.1-.6-.1-1.1-.3-1.5M12 18c-.6 0-1-.4-1-1s.4-1 1-1s1 .4 1 1s-.4 1-1 1m1-5c0 .6-.4 1-1 1s-1-.4-1-1V9c0-.6.4-1 1-1s1 .4 1 1z"
                    ></path>
                  </svg>{" "}
                  ALERT
                </h6>{" "}
                <div class="text-sm leading-normal sm:text-base">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          ))}
        {window.history.replaceState({}, "")}
        <SearchBar />

        <Outlet />
        <Footer />
      </main>
    </>
  );
}
