import * as yup from "yup"


export const validationLogin = yup.object().shape({
  email: yup.string().typeError("не строка").email("не емаил").required("обязательно"),
  password: yup
    .string()
    .test(
      "password",
      "Пароль должен содержать хотя бы одну строчную букву, одну прописную букву, одну цифру и один специальный символ",
      (value) => {
        return (
          /[a-z]/.test(value) &&
          /[A-Z]/.test(value) &&
          /\d/.test(value) &&
          /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)
        );
      }
    )
    .min(6, "Минимальная длина пароля - 6 символов")
    .max(15, "Максимальная длина пароля - 15 символов")
    .required("Пароль обязателен для заполнения"),
});



export const validationForgot = yup.object().shape({
  email: yup.string().email().required()
})

export const validationCreate = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup
    .string()
    .test(
      "password",
      "Пароль должен содержать хотя бы одну строчную букву, одну прописную букву, одну цифру и один специальный символ",
      (value) => {
        return (
          /[a-z]/.test(value) &&
          /[A-Z]/.test(value) &&
          /\d/.test(value) &&
          /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)
        );
      }
    )
    .min(6, "Минимальная длина пароля - 6 символов")
    .max(15, "Максимальная длина пароля - 15 символов")
    .required("Пароль обязателен для заполнения"),
  confirmPass: yup
    .string()
    .oneOf([yup.ref("password")])
    .typeError("не соответcтвует")
})


export const validationNewPass = yup.object().shape({
  password: yup
    .string()
    .test(
      "password",
      "Пароль должен содержать хотя бы одну строчную букву, одну прописную букву, одну цифру и один специальный символ",
      (value) => {
        return (
          /[a-z]/.test(value) &&
          /[A-Z]/.test(value) &&
          /\d/.test(value) &&
          /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)
        );
      }
    )
    .min(6, "Минимальная длина пароля - 6 символов")
    .max(15, "Максимальная длина пароля - 15 символов")
    .required("Пароль обязателен для заполнения"),
  confirmPass: yup
    .string()
    .oneOf([yup.ref("password")])
    .typeError("не соответcтвует")
})

