import plus from "../../../img/main/plusIcon.svg";

import styles from "./TreadsPhotoReader.module.css";

const TreadsPhotoReader = ({ setPhoto, setImageData }) => {
  const handlePhoto = (event) => {
    const selectedPhoto = event.target.files[0];
    setImageData(selectedPhoto);

    if (selectedPhoto) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target.result);
      };
      reader.readAsDataURL(selectedPhoto);
    }
  };
  return (
    <div>
      <div>
        <input
          type="file"
          id="inpMain"
          accept="image/*, video/*"
          style={{ display: "none" }}
          onChange={handlePhoto}
        />
        <button
          className={styles.btn}
          onClick={() => {
            document.querySelector("#inpMain").click();
          }}
        >
          <img src={plus} alt="скрепка" />
        </button>
      </div>
    </div>
  );
};

export default TreadsPhotoReader;
