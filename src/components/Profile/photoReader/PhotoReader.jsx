import { useDispatch } from "react-redux";

import newPhotoIcon from "../../../img/profile/newPhoto.svg";
import ava from "../../../img/profile/initialAva.svg";
import deletePhotoIcon from "../../../img/profile/deletePhoto.svg";
import { setUser } from "../../../store/userSlice";
import { newPhoto, deleteMyPhoto } from "../../../api/profile";

import styles from "./photoReader.module.css";

const PhotoReader = () => {
  const dispatch = useDispatch();

  const handleAvatarChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("photo", selectedFile);

      newPhoto(formData)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        dispatch(setUser({ photo: e.target.result }));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const deletePhoto = () => {
    dispatch(setUser({ photo: ava }));
    deleteMyPhoto()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <input
          type="file"
          accept="image/*"
          id="avatarInput"
          style={{ display: "none" }}
          onChange={handleAvatarChange}
        />
        <button
          className={styles.btn}
          onClick={() => document.getElementById("avatarInput").click()}
        >
          <img src={newPhotoIcon} alt="newPhotoIcon" />
          New profile picture
        </button>
      </div>
      <button
        onClick={() => {
          deletePhoto();
        }}
        className={styles.deleteBtn}
      >
        <img src={deletePhotoIcon} alt="deletePhoto" />
        Remove current picture
      </button>
    </div>
  );
};

export default PhotoReader;
