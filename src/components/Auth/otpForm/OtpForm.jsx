import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { otpVerify } from "../../../api/Auth";
import BlackBtn from "../../../ui/buttons/authButtons/BlackBtn";

import styles from "./OtpForm.module.css";

const OtpForm = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(false);

    // Автоматически переходим к следующему инпуту, если текущий инпут заполнен
    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4 || isNaN(enteredOtp)) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }

    otpVerify({
      email: email,
      otp: Number(enteredOtp),
    })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("otp", Number(enteredOtp));
          navigate("/newpass");
        }
      })
      .catch((error) => {
        if ((error.response.status = 404)) {
          setError(error.response.data.detail);
        }
      });
  };

  return (
    <div className={styles.otpFormDiv}>
      <div className={styles.inpDiv}>
        {otp.map((digit, index) => (
          <input
            className={styles.otpInp}
            key={index}
            type="text"
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(index, e.target.value)}
            ref={inputRefs[index]}
          />
        ))}
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
      <BlackBtn onClick={handleSubmit}>Verify</BlackBtn>
    </div>
  );
};

export default OtpForm;
