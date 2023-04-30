import React, { useContext, useEffect, useState } from "react";
import ExtPay from "extpay";
import { Typography, Button, LinearProgress } from "@mui/material";
import API from "../api/API";
import axios from "axios";
import "./Home.css";
import * as process from "process";
import Transform from "../transform/Transform";
import Settings from "../settings/Settings";
import BasicTabs from "@pages/popup/components/tabs/Tabs";
import * as log from "loglevel";
import Functions from "@pages/popup/components/functions/Functions";
import PopupContext from "@pages/popup/components/context/popup-context";
import LoadingScreen from "@pages/popup/components/loading-screen/LoadingScreen";
const ll = log.getLogger("Home");
const extpay = ExtPay(process.env.VITE_EXTENSIONPAY_ID);

const isLogsEnabled = false;
if (process.env.VITE_ENV === "development" && isLogsEnabled) {
  ll.setLevel(log.levels.DEBUG);
} else {
  ll.setLevel(log.levels.WARN);
}

async function getUser() {
  const user = await extpay.getUser();
  return user;
}

async function getCurrentTab() {
  const queryOptions = { active: true, currentWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const popupContext = useContext(PopupContext);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeHandle, setTimeHandle] = useState(null);
  const waitingTime = {
    free: 1500,
    pro: 800,
  };
  useEffect(() => {
    const onTimePasses = () => {
      setElapsedTime((p) => {
        const newTime = p + 100;
        const isPro = user?.paid === true;
        if (isPro === false) {
          if (newTime >= waitingTime.free) {
            clearInterval(handle);
          }
        } else {
          if (newTime >= waitingTime.pro) {
            clearInterval(handle);
          }
        }
        return newTime;
      });
    };
    const handle = setInterval(onTimePasses, 100);
    setTimeHandle(handle);
    return () => {
      clearInterval(handle);
    };
  }, []);
  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      if (request.action === "reload_page") {
        window.location.reload();
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      ll.debug("user changed", user);
      popupContext.setData({
        user,
      });
    }
  }, [user]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const myUser = await getUser();
      setIsLoading(false);
      setUser(myUser);
    })();
  }, []);
  const renderUI = () => {
    const isPro = user?.paid === true;
    if (isPro === false) {
      if (isLoading || elapsedTime < waitingTime.free) {
        return <LoadingScreen lines={5} styleOverride={{}} />;
      }
    } else {
      if (isLoading || elapsedTime < waitingTime.pro) {
        return <LoadingScreen lines={5} styleOverride={{}} />;
      }
    }
    return (
      <BasicTabs
        titles={[
          // eslint-disable-next-line react/jsx-key
          <div>tranform</div>,
          // eslint-disable-next-line react/jsx-key
          <div>functions</div>,
          // eslint-disable-next-line react/jsx-key
          <div>settings</div>,
        ]}
        // eslint-disable-next-line react/jsx-key
        components={[<Transform />, <Functions />, <Settings />]}
      />
    );
  };
  return <div className="Home">{renderUI()}</div>;
};

export default Home;
