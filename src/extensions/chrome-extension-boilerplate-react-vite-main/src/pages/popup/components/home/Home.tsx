import React, { useEffect, useState } from "react";
import ExtPay from "extpay";
import { Typography, Button } from "@mui/material";
import API from "../api/API";
import axios from "axios";
import * as process from "process";
import ETT from "../ett/ETT";
import Settings from "../settings/Settings";
import BasicTabs from "@pages/popup/components/tabs/Tabs";
import * as log from "loglevel";
const ll = log.getLogger("Home.tsx");
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
  const renderPaymentStatus = (user) => {
    if (isLoading) {
      return <div>loading...</div>;
    } else if (user && user.paid) {
      return (
        <BasicTabs
          // eslint-disable-next-line react/jsx-key
          titles={[<div>tranform</div>, <div>settings</div>]}
          // eslint-disable-next-line react/jsx-key
          components={[<ETT />, <Settings />]}
        />
      );
      /*return (
        <div>
          <div>all good, you paid. here is your reward.</div>
          <Button
            onClick={async () => {
              chrome.runtime.sendMessage({ greeting: "hello" }, (response) => {
                ll.debug("got message back", response);
              });
            }}
          >
            SEND TASK TO BG
          </Button>
          <Button
            onClick={() => {
              (async () => {
                const [tab] = await chrome.tabs.query({
                  active: true,
                  lastFocusedWindow: true,
                });
                if (tab.id !== undefined) {
                  const response = await chrome.tabs.sendMessage(tab.id, {
                    greeting: "hello",
                  });
                  // do something with response here, not outside the function
                  ll.debug(
                    "got back response from content script: ",
                    response
                  );
                }
              })();
            }}
          >
            SEND TASK TO CONTENT SCRIPT
          </Button>
          <Button
            onClick={async () => {
              const myDataResponse = await API.makeRequest({ hello: "world" });
              ll.debug("got response form private endpoint", myDataResponse);
            }}
          >
            PRIVATE ENDPOINT
          </Button>
        </div>
      );*/
    } else {
      return <Button onClick={extpay.openPaymentPage}>pay now</Button>;
    }
  };
  return <div className="Home">{renderPaymentStatus(user)}</div>;
};

export default Home;
