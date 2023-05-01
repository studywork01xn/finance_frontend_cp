import styles from "./Settings.module.scss";
import { useState } from "react";

export default function Expenses() {
  function handleKeyPress(event: any) {
    if (event.key === "-" || event.key === "+") {
      event.preventDefault();
    }
  }

  return (
    <>
      <div className={styles.settings}>
        <div className={styles.settingsCard}>
          <div className={styles.settingsOverview}>
            <div className={styles.settingsHeader}>
              <p className={styles.settingsTitle}>Settings</p>

              <div className={styles.textbox_container}>
                <input
                  type="number"
                  placeholder="Update Monthly Income"
                  className={styles.textbox}
                  step="any"
                  min="0"
                  onKeyPress={handleKeyPress}
                />
                <button className={styles.button}>Update</button>
              </div>

              <div className={styles.textbox_container}>
                <input type="email" placeholder="Update email" />
                <button className={styles.button}>Update</button>
              </div>

              <div className={styles.textbox_container}>
                <input
                  type="password"
                  placeholder="Update Password"
                  className={styles.textbox}
                />
                <button className={styles.button}>Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
