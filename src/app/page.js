import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import ContentArea from "../components/ContentArea/ContentArea";
import styles from "./page.module.css";

const HomePage = () => {
  return (
    <div className={styles.main}>
      <Sidebar />
      <ContentArea />
      {/* Rest of your page content */}
    </div>
  );
};

export default HomePage;
