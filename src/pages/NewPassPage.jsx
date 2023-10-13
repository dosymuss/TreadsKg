import { useState } from "react";

import LogoDesign from "../ui/design/logoDesign/LogoDesigtn";
import NewPassForm from "../components/Auth/newPassForm/NewPassForm";
import AuthTitle from "../ui/text/AuthText/AuthTitle";
import AuthEndModal from "../ui/modal/authModal/authEndModal/AuthEndModal";

import styles from "../styles/NewPass.module.css"

const NewPassPage = () => {
  const [active, setActive] = useState(false)
  
  return (
    <div className={styles.passMain}>
      <LogoDesign />
      <div className={styles.passDesc}>
        <div>
          <AuthEndModal
          text={"password updated"}
          active={active}
          setActive={setActive}
          path={""}
          />
        <AuthTitle
          title={"Create new password"}
          desc={
            "Your new password must be different from previous used passwords"
          }
        />
        <NewPassForm setActive={setActive}/>
        </div>
      </div>
    </div>
  );
};

export default NewPassPage;
