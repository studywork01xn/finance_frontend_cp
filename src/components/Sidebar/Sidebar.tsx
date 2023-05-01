import styles from "./Sidebar.module.scss";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const sidebarNavLinks = ["dashboard", "analytics", "settings", "logout"];

const handleLogout = () => {
  localStorage.removeItem("token");
};

export default function Sidebar() {
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function getUserDetails() {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/userData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: token,
        }),
      });
      const result = await response.json();
      setName(result.data.fname);
      setEmail(result.data.email);
      localStorage.setItem("email", result.data.email);
    }
    getUserDetails();
  }, []);

  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <div className={styles.profileDetails}>
            <div className={styles.profileImageDiv}></div>
            <p className={styles.userName}>{name}</p>
            <p className={styles.userEmail}>{email}</p>
          </div>

          <nav className={styles.sidebarNav}>
            <ul>
              {sidebarNavLinks.map((sidebarNavLink) => (
                <li className={styles.sidebarNavItem} key={sidebarNavLink}>
                  <Link
                    className={
                      location.pathname === `/${sidebarNavLink}`
                        ? styles.sidebarNavLinkActive
                        : styles.sidebarNavLink
                    }
                    to={`/${sidebarNavLink}`}
                    onClick={() => {
                      if (sidebarNavLink === "logout") {
                        handleLogout();
                      }
                    }}
                  >
                    {sidebarNavLink.charAt(0).toUpperCase() +
                      sidebarNavLink.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
