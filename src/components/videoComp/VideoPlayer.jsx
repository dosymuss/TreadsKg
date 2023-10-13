import React, { useRef, useState } from "react";

import volume from "../../img/videoIcon/free-icon-volume-4620119.png";
import mute from "../../img/videoIcon/free-icon-mute-4620033.png";

import styles from "./VideoPlayer.module.css";

function VideoPlayer({ videoSource, section }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [width, setWidth] = useState(567);
  const [height, setHeight] = useState(null);

  const video = document.createElement("video");

  // Установите источник видео
  video.src = videoSource;

  // Обработайте событие 'loadedmetadata', которое произойдет, когда метаданные видео будут доступны
  video.addEventListener("loadedmetadata", function () {
    const width = video.videoWidth; // Получите ширину видео
    const height = video.videoHeight;


    if (width > 567) {
      setWidth(567);
    } else {
      setWidth(width);
    }
    if (height > width && height > 700) {
      setHeight(600);
      setWidth(width);
    }
    if(section === "create"){
      if (width > 420) {
        setWidth(420);
      } else {
        setWidth(width);
      }
      if (height > width && height > 420) {
        setHeight(420);
        setWidth(null);
      }
    }
  });

  const style = {
    width: width<567?width:"auto",
    height: height ? `${height}px` : undefined,
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <div className={styles.main}>
      <video
        className={section === "create" ? styles.preview : styles.video}
        style={style}
        ref={videoRef}
        loop
        autoPlay
        muted={muted}
      >
        <source src={videoSource} type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
      <button className={styles.muteBtn} onClick={toggleMute}>
        {muted ? <img src={mute} alt="" /> : <img src={volume} alt="" />}
      </button>
    </div>
  );
}

export default VideoPlayer;
