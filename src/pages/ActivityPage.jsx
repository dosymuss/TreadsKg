import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import FollowPanel from "../ui/design/usersPanel/FollowPanel";
import Navbar from "../ui/nav/Navbar/Navbar";
import {
  getAllActivity,
  getActivityFollowers,
  getRequestActivity,
} from "../store/activitySlice";

import ActivityItem from "../components/activity/activityItem/ActivityItem";
import ApproveBtn from "../components/activity/approveAll/ApproveBtn";

import ActivityLine from "../components/activity/activityLine/ActivityLine";

import styles from "../styles/ActivityPage.module.css";
import ActivityTest from "../components/activity/activityTest/ActivityTest";
import ShortLine from "../ui/design/shortLine/ShortLine";
import ActivityFollow from "../components/activity/activityItem/activityFollow/ActivityFollow";
import ActivityRequest from "../components/activity/activityItem/activityRequest/ActivityRequest";

const ActivityPage = () => {
  const [part, setPart] = useState("follow");
  const activity = useSelector((state) => state.activity);
  const dispatch = useDispatch();
  useEffect(() => {
    if (part === "follow") {
      dispatch(getActivityFollowers());
    }
    if (part === "request") {
      dispatch(getRequestActivity());
    }
    // dispatch(getAllActivity());

  }, [part]);


  return (
    <div className={styles.main}>
      <div className={styles.navDiv}>
        <Navbar />
      </div>
      <div className={styles.activDiv}>
        <p className={styles.activTitle}>Activity</p>
        <div className={styles.switchDiv}>
          <button
            className={
              part === "comment" ? styles.switchBtnActive : styles.switchBtn
            }
            onClick={() => {
              setPart("comment");
            }}
          >
            Comments
          </button>
          <button
            className={
              part === "follow" ? styles.switchBtnActive : styles.switchBtn
            }
            onClick={() => {
              setPart("follow");
            }}
          >
            Following
          </button>
          <button
            className={
              part === "request" ? styles.switchBtnActive : styles.switchBtn
            }
            onClick={() => {
              setPart("request");
            }}
          >
            Requests
          </button>
        </div>
        <div className={styles.activeAccount}>
          {part === "request" && (
            <>
              <ApproveBtn />
              <ActivityLine />
              {activity.map((item) => {
                return (
                  <>
                    <ActivityRequest item={item} />
                    <ActivityLine />
                  </>
                );
              })}
            </>
          )}
          {part === "comment" && <ActivityItem section={"comment"} />}
          {part === "follow" &&
            activity.map((item) => (
              <>
                <ActivityFollow item={item} />
                <ActivityLine />
              </>
            ))}
        </div>
      </div>
      <div className={styles.followDiv}>
        <FollowPanel />
      </div>
    </div>
  );
};

export default ActivityPage;
