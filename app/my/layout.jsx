"use client";

import useMediaQuery from "@mui/material/useMediaQuery";

import { useState, useLayoutEffect, useContext, createContext } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { getNotifications } from "#/server/notifications";
import FullDesktopNav from "#/layout/full-desktop-nav";
import MiniDesktopNav from "#/layout/mini-desktop-nav";
import Header from "#/layout/header";

import "./layout.css";

const BottomNav = dynamic(() => import("#/layout/bottom-nav"));

const UserContext = createContext();
const KeysContext = createContext();
const NotificationsContext = createContext();

export default function MyLayout({ children }) {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isBigScreen = useMediaQuery("(min-width:1200px)");
  const router = useRouter();

  const [notifications, setNotifications] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(true);
  const [stretch, setStretch] = useState(true);
  const [user, setUser] = useState(null);
  const [keys, setKeys] = useState(null);

  useLayoutEffect(() => {
    fetch("/api/bebra")
      .then((res) => res.json())
      .then((data) => {
        if (data === null) {
          setUser(false);
        } else {
          setUser(data[0]);
          setKeys(data[1]);
          getNotifications(data[0].id).then((r) => {
            setNotifications(
              r.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            );
          });
        }
      });
    setOpenSidebar(JSON.parse(localStorage.getItem("sidebar")) ?? true);
    setStretch(JSON.parse(localStorage.getItem("stretch")) ?? true);
  }, []);

  if (user === false) {
    router.push("/login");
  } else if (user !== null) {
    return (
      <>
        <Header
          keys={keys}
          id={user.id}
          stretch={stretch}
          email={user.email}
          unread={user.unread}
          username={user.name}
          setStretch={setStretch}
          openSidebar={openSidebar}
          privateMode={user.private}
          convertMode={user.convert}
          notifications={notifications}
          setNotifications={setNotifications}
        />
        <div style={{ display: "flex" }}>
          {isBigScreen && (
            <nav
              style={{
                width: openSidebar ? "280px" : "90px",
              }}
            >
              {openSidebar ? (
                <FullDesktopNav
                  activate={Boolean(user.activated_at)}
                  setOpenSidebar={setOpenSidebar}
                  privateMode={user.private}
                  convertMode={user.convert}
                  username={user.name}
                  keys={keys}
                />
              ) : (
                <MiniDesktopNav setOpenSidebar={setOpenSidebar} />
              )}
            </nav>
          )}
          <main
            style={
              isBigScreen
                ? {
                    margin: "0 auto",
                    padding: "80px 40px 100px",
                    width: "calc(100% - 280px)",
                    maxWidth: stretch ? "1600px" : "100%",
                  }
                : {
                    margin: "0 auto",
                    padding: "80px 16px 100px",
                  }
            }
          >
            <UserContext.Provider value={{ user, setUser }}>
              <KeysContext.Provider value={{ keys, setKeys }}>
                <NotificationsContext.Provider
                  value={{ notifications, setNotifications }}
                >
                  {children}
                </NotificationsContext.Provider>
              </KeysContext.Provider>
            </UserContext.Provider>
          </main>
          {isSmallScreen && <BottomNav />}
        </div>
      </>
    );
  }
}

export function useUser() {
  return useContext(UserContext);
}

export function useKeys() {
  return useContext(KeysContext);
}

export function useNotifications() {
  return useContext(NotificationsContext);
}
