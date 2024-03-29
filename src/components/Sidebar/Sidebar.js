"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";
import { RiDashboardLine, RiArrowDropDownLine } from "react-icons/ri";
import { FaTasks, FaRegUser } from "react-icons/fa";
import { BsChatLeft } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { BiSolidUserCircle } from "react-icons/bi";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("Customers");
  const [activeNested, setActiveNested] = useState("All");

  const menus = [
    { item: "Dashboard", icon: RiDashboardLine },
    { item: "Task", icon: FaTasks },
    { item: "Customers", icon: FaRegUser, nested: ["All", "Account Upgrade"] },
    { item: "Chats", icon: BsChatLeft },
    { item: "Disputes", icon: MdErrorOutline },
  ];

  const handleNestedClick = (nestedItem) => {
    setActiveNested(nestedItem);
    // If needed, perform any additional logic when a nested item is clicked
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <BiSolidUserCircle style={{ fontSize: "4rem" }} />
        <div className={styles.text}>
          <p className={styles.name}>Anna George</p>
          <p className={styles.role}>Customer Operations</p>
        </div>
        <RiArrowDropDownLine style={{ fontSize: "2rem" }} />
      </div>
      {menus.map((menu, index) => (
        <div key={index}>
          <div
            className={
              activeMenu === menu.item
                ? `${styles.active} ${styles.menuItem}`
                : `${styles.inactive} ${styles.menuItem}`
            }
            onClick={() => setActiveMenu(menu.item)}
          >
            <menu.icon style={{ fontSize: "1.5rem" }} />
            <span>{menu.item}</span>
            {activeMenu === menu.item && (
              <RiArrowDropDownLine
                style={{
                  fontSize: "24px",
                  rotate: "270deg",
                  marginLeft: "auto",
                }}
              />
            )}
          </div>
          {menu.nested && activeMenu === menu.item && (
            <div className={styles.nestedMenu}>
              {menu.nested.map((nestedItem) => (
                <div
                  key={nestedItem}
                  className={
                    activeNested === nestedItem
                      ? `${styles.activeNested} ${styles.nestedItem}`
                      : `${styles.inactiveNested} ${styles.nestedItem}`
                  }
                  onClick={() => handleNestedClick(nestedItem)}
                >
                  {nestedItem}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <hr className={styles.divider} />
      <div className={styles.inactive + " " + styles.menuItem}>
        <FiSettings style={{ fontSize: "1.25rem" }} />
        <span>Settings</span>
      </div>
    </div>
  );
};

export default Sidebar;
