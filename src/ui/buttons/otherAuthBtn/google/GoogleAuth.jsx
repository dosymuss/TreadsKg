import googleIcon from "../../../../img/auth/googleIcon.svg"
import { useGoogleLogin } from "@react-oauth/google";
import { getInfoForG } from "../../../../api/Auth";

import styles from "./google.module.css"

const GoogleAuth = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      getInfoForG(tokenResponse.access_token).then((res) => {
        console.log(res.data);
      });
    },
  });

  return (
    <button className={styles.button}
    onClick={login}
    >
      <img src={googleIcon} alt="гугл" />
      <p>Login with Google</p>
    </button>
  );
};



export default  GoogleAuth