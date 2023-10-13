import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import ava from "../../../img/profile/initialAva.svg";
import closeIcon from "../../../img/follow/exitFollow.svg";
import anyone from "../../../img/treads/createAny.svg";
import createProfile from "../../../img/treads/createProfile.svg";
import menti from "../../../img/treads/mentionetOnly.svg";
import yourFollowers from "../../../img/treads/followers.svg";

import TreadsPhotoReader from "../../../components/Main/treadsPhotoReader/TreadsPhotoReader";
import { newTread } from "../../../store/treadsSlice";
import CreateInp from "../../buttons/createTreadsBtn/createInp/CreateInp";

import styles from "./CreateModal.module.css";
import VideoPlayer from "../../../components/videoComp/VideoPlayer";
import ErrorModal from "../errorModal/ErrorModal";

const CreateModal = ({ active, setActive, section }) => {
  const [watch, setWatch] = useState(false);
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [text, setText] = useState("");
  const [permission, setPermission] = useState("anyone");
  const [limit, setLimit] = useState(false);
  const [limitSize, setLimitSize] = useState(false);
  const [errorMes, setErrorMes] = useState("");
  const [difference, setDifference] = useState(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  // console.log(imageData);

  const user = JSON.parse(localStorage.getItem("userData"));
  const dispatch = useDispatch();

  const createTread = () => {
    const formData = new FormData();
    formData.append("author", user.username);
    formData.append("text", text);
    formData.append("comments_permission", permission);
    if (imageData) {
      if (
        imageData.type === "image/jpeg" ||
        imageData.type === "image/png" ||
        imageData.type === "image/gif"
      ) {
        formData.append("image", imageData);
      }
      if (imageData.type === "video/mp4") {
        formData.append("video", imageData);
      }
    }

    dispatch(newTread(formData));
    setImage(null);
    setText("");
    if (section !== "createPost") {
      setActive(!active);
    }
  };

  const resetCreateForm = () => {
    setImage(null);
    setText("");
  };

  useEffect(() => {
    if (!active) {
      resetCreateForm();
    }
  }, [active]);

  const choiceImage = new Image();
  choiceImage.src = image;
  choiceImage.onload = function () {
    const width = choiceImage.width;
    const height = choiceImage.height;
    if (width > 420) {
      setWidth(420);
    } else {
      setWidth(width);
    }
    if (height > width && height > 420) {
      setHeight(420);
      setWidth(null);
    }
  };

  const style = {
    width: width ? `${width}px` : "auto",
    height: height ? `${height}px` : "auto",
  };

  return (
    <div className={active ? styles.modalActiveCreate : styles.modalCreate}>
      <ErrorModal
        text={errorMes}
        active={limitSize}
        set
        Active={setLimitSize}
      />
      <div className={styles.modalContentCreate}>
        <div className={styles.closeModalDiv}>
          <div className={limit ? styles.closeModalError : styles.closeModal}>
            <p style={{ color: "red" }}>{difference && ` - ${difference}`}</p>
            <button
              onClick={() => {
                setActive(false);
              }}
              className={styles.closeModalBtn}
            >
              <img src={closeIcon} alt="" />
            </button>
          </div>
          <div className={styles.createMain}>
            <div className={styles.imageDiv}>
              <div className={styles.imageDivItem}>
                <img
                  className={styles.image}
                  src={user.photo ? user.photo : ava}
                  alt="аватарка"
                />
                <div className={styles.imageDivDesc}>
                  <p className={styles.nickName}>{user.username}</p>
                  <CreateInp
                    setText={setText}
                    placeholder={"Start a thread..."}
                    style={styles.createInp}
                    text={text}
                    limit={limit}
                    setLimit={setLimit}
                    setDifference={setDifference}
                  />
                  {/* {imageData&& checkData()} */}
                  {image &&
                    (imageData.type === "image/jpeg" ||
                      imageData.type === "image/png" ||
                      imageData.type === "image/gif") && (
                      <div className={styles.prewDiv}>
                        <img style={style} className={styles.choiceImg} src={image} alt="" />
                        <button
                          className={styles.closeBtn}
                          onClick={() => {
                            setImage(null);
                          }}
                        >
                          <img src={closeIcon} alt="" />
                        </button>
                      </div>
                    )}
                  {image && imageData.type === "video/mp4" && (
                    <div className={styles.prewDiv}>
                      <VideoPlayer section={"create"} videoSource={image} />
                      <button
                        className={styles.closeBtn}
                        onClick={() => {
                          setImage(null);
                        }}
                      >
                        <img src={closeIcon} alt="" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className={image ? styles.postDiv : styles.postDivText}>
                <button
                  disabled={(text === "" && !image) || limit}
                  onClick={createTread}
                  className={styles.postName}
                >
                  Post
                </button>
              </div>
            </div>
            <div className={styles.plusDiv}>
              <TreadsPhotoReader
                setImageData={setImageData}
                setPhoto={setImage}
              />
              <button
                onClick={() => {
                  setWatch(!watch);
                }}
                className={styles.canReplyBtn}
              >
                {permission}
              </button>
            </div>
          </div>
          <div
            className={watch ? styles.modalContentActive : styles.modalContent}
          >
            <div className={styles.watchDiv}>
              <button
                onClick={() => {
                  setPermission("anyone");
                  setWatch(!watch)
                }}
                className={styles.watchBtns}
              >
                Anyone <img src={anyone} alt="" />
              </button>
              <button
                onClick={() => {
                  setPermission("your followers");
                  setWatch(!watch)
                }}
                className={styles.watchBtns}
              >
                Your followers <img src={yourFollowers} alt="" />
              </button>
              <button
                onClick={() => {
                  setPermission("profiles you follow");
                  setWatch(!watch)
                }}
                className={styles.watchBtns}
              >
                Profiles you follow <img src={createProfile} alt="" />
              </button>
              <button
                onClick={() => {
                  setPermission("mentioned only");
                  setWatch(!watch)
                }}
                className={styles.watchBtns}
              >
                Mentioned only <img src={menti} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
