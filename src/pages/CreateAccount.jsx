import CreateForm from "../components/Auth/createForm/CreateForm";
import LogoDesign from "../ui/design/logoDesign/LogoDesigtn";

import styles from "../styles/CreateAccount.module.css";
import AuthTitle from "../ui/text/AuthText/AuthTitle";

const CreateAccount = () => {
  return (
    <div className={styles.createWrap}>
      <LogoDesign />
      <div className={styles.createDesc}>
        <div>
          <AuthTitle
            title={"Create an account"}
            desc={"Create account to start using Threads"}
          />
          <CreateForm />
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
