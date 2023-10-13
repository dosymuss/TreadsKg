import EditForm from "../components/Profile/EditForm/EditForm";
import Navbar from "../ui/nav/Navbar/Navbar";

import styles from "../styles/EditProfile.module.css";

const EditProfile = () => {
  return (
    <div className={styles.main}>
      <div className={styles.navDiv}>
        <Navbar />
      </div>
      <EditForm />
    </div>
  );
};

export default EditProfile;
