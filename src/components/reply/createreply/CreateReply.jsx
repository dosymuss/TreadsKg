import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ava from "../../../img/profile/initialAva.svg";
import anyone from "../../../img/treads/createAny.svg";
import createProfile from "../../../img/treads/createProfile.svg";
import menti from "../../../img/treads/mentionetOnly.svg";
import yourFollowers from "../../../img/treads/followers.svg";
import TreadsPhotoReader from "../../../components/Main/treadsPhotoReader/TreadsPhotoReader";
import { postComment } from "../../../api/post";
import CreateInp from "../../../ui/buttons/createTreadsBtn/createInp/CreateInp";
import { getProfileById } from "../../../api/profile";
import Loader from "../../../ui/loader/Loader";

import styles from "./CreateReply.module.css";

const CreateReply = ({ author }) => {
  const [watch, setWatch] = useState(false);
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [text, setText] = useState("");
  const [permission, setPermission] = useState("anyone");
  const [limit, setLimit] = useState(false);
  const [difference, setDifference] = useState(null);
  const [treadAuthor, setTreadAuthor] = useState("хз кто это");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfileById(author)
      .then((res) => {
        console.log(res);
        setTreadAuthor(res.data.username);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [author]);

  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("userData"));

  const navigate = useNavigate();

  const createTread = () => {
    // const formData = new FormData();
    // // formData.append('author', user);
    // formData.append('text', text);
    // formData.append('comments_permission', permission);
    // if(imageData){
    //   formData.append('image', imageData);
    // }
    postComment(id, text)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    // dispatch(
    //   newTread(formData),
    // );
    setImage(null);
    setText("");
    // if(section !== "createPost"){
    //   setActive(!active);
    // }
    navigate(`/tread/${id}`);
  };

  const resetCreateForm = () => {
    setImage(null);
    setText("");
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className={styles.modalContentCreatePost}>
        {difference && (
          <p className={styles.diff} style={{ color: "red" }}>
            {difference && ` - ${difference}`}
          </p>
        )}
        <div className={styles.closeModal}>
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
                    placeholder={`Reply to ${treadAuthor}...`}
                    style={styles.createInp}
                    text={text}
                    limit={limit}
                    setLimit={setLimit}
                    setDifference={setDifference}
                  />
                </div>
              </div>
              <div className={image ? styles.postDiv : styles.postDivText}>
                <button
                  disabled={(text === "" && !image) || limit}
                  onClick={() => {
                    createTread();
                    resetCreateForm();
                  }}
                  className={styles.postName}
                >
                  Post
                </button>
              </div>
            </div>
            <div className={styles.plusDiv}>
              <div></div>
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
                  setWatch(!watch);
                }}
                className={styles.watchBtns}
              >
                Anyone <img src={anyone} alt="" />
              </button>
              <button
                onClick={() => {
                  setPermission("your followers");
                  setWatch(!watch);
                }}
                className={styles.watchBtns}
              >
                Your followers <img src={yourFollowers} alt="" />
              </button>
              <button
                onClick={() => {
                  setPermission("profiles you follow");
                  setWatch(!watch);
                }}
                className={styles.watchBtns}
              >
                Profiles you follow <img src={createProfile} alt="" />
              </button>
              <button
                onClick={() => {
                  setPermission("mentioned only");
                  setWatch(!watch);
                }}
                className={styles.watchBtns}
              >
                Mentioned only <img src={menti} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CreateReply;
