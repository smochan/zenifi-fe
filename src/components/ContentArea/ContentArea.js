"use client";

import { useState, useEffect } from "react";
import styles from "./ContentArea.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { TfiMenuAlt } from "react-icons/tfi";
import { BsFillGridFill } from "react-icons/bs";
import { BiFilter, BiSolidUserCircle } from "react-icons/bi";

import getTime from "@/utils/getTime";
import generateRandomData from "@/utils/generateData";

const ContentArea = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [usersList, setUserList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [pendingCount, setPendingCount] = useState(null);
  const [cancelledCount, setCancelledCount] = useState(null);

  const handleCheckboxChange = (row) => (event) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(row.email)
        ? prevSelectedRows.filter((e) => e !== row.email)
        : [...prevSelectedRows, row.email]
    );

    if (selectedRows.includes(row.email)) {
      console.log("Deselected: ", row);
    } else {
      console.log("Selected: ", row);
    }
  };

  const handleRowClick = (row) => {
    handleCheckboxChange(row)();
  };

  useEffect(() => {
    const data = generateRandomData(40);

    setUserList(data.sort((a, b) => b.time - a.time));
  }, []);

  useEffect(() => {
    let pending = 0;
    let cancelled = 0;
    usersList?.forEach((row) => {
      if (row.status === "pending") {
        pending++;
      } else if (row.status === "cancelled") {
        cancelled++;
      }
    });

    setPendingCount(pending);
    setCancelledCount(cancelled);
  }, [usersList]);

  return (
    <main className={styles.contentArea}>
      <div className={styles.tabContent}>
        <div className={styles.tabs}>
          <button
            className={
              activeTab === "pending"
                ? styles.button + " " + styles.activeTab
                : styles.button
            }
            onClick={() => setActiveTab("pending")}
          >
            Pending{"  "}
            <span
              className={
                activeTab === "pending" ? styles.activeCount : styles.count
              }
            >
              {pendingCount ? pendingCount : 0}
            </span>
          </button>
          <button
            className={
              activeTab === "cancelled"
                ? styles.button + " " + styles.activeTab
                : styles.button
            }
            onClick={() => setActiveTab("cancelled")}
          >
            Cancelled{"  "}
            <span
              className={
                activeTab === "cancelled" ? styles.activeCount : styles.count
              }
            >
              {cancelledCount ? cancelledCount : 0}
            </span>
          </button>
          <p className={styles.tabCount}>Showing 1-9 of 1500 results</p>
        </div>

        <div className={styles.filterSearch}>
          <div className={styles.search}>
            <AiOutlineSearch
              style={{
                color: "#5a5a5a",
              }}
            />
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchField}
            />
          </div>
          <div className={styles.filterView}>
            <div className={styles.view}>
              <div
                className={styles.viewMenu}
                style={{ backgroundColor: "#cddcf5" }}
              >
                <TfiMenuAlt
                  style={{
                    color: "#76a9f0",
                  }}
                />
              </div>
              <div
                className={styles.viewGrid}
                style={{ backgroundColor: "#fff" }}
              >
                <BsFillGridFill
                  style={{
                    color: "#5a5a5a",
                  }}
                />
              </div>
            </div>
            <div
              className={styles.filterOption}
              style={{ backgroundColor: "#fff" }}
            >
              <BiFilter
                style={{
                  color: "#5a5a5a",
                  fontSize: "1.2rem",
                }}
              />
              <span>Filter</span>
            </div>
          </div>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    id="selectAll"
                    className={styles.hiddenCheckbox}
                  />
                  <label
                    htmlFor="selectAll"
                    className={styles.customCheckbox}
                  ></label>
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Account Tier</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {usersList &&
                usersList?.map((row, index) => {
                  if (activeTab === row.status) {
                    return (
                      <tr
                        key={index}
                        className={styles.tableRow}
                        onClick={() => handleRowClick(row)}
                      >
                        <td>
                          <input
                            type="checkbox"
                            id={row.email}
                            className={styles.hiddenCheckbox}
                            checked={selectedRows.includes(row.email)}
                            onChange={handleCheckboxChange(row)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <label
                            htmlFor={row.email}
                            className={styles.customCheckbox}
                            onClick={(e) => e.stopPropagation()}
                          ></label>
                        </td>
                        <td className={styles.name}>
                          <BiSolidUserCircle
                            style={{
                              fontSize: "2rem",
                            }}
                          />
                          {row.name}
                        </td>
                        <td>{row.email}</td>
                        <td>{row.phone_num}</td>
                        <td>Tier {row.tier}</td>
                        <td>{getTime(row.time)}</td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.pagination}>
        <span className={styles.pageNumber + " " + styles.activePage}>1</span>
        <span className={styles.pageNumber}>2</span>
        <span className={styles.pageNumber}>3</span>
        <span className={styles.pageNumber}>4</span>
        <span className={styles.pageNumber}>5</span>
      </div>
    </main>
  );
};

export default ContentArea;
