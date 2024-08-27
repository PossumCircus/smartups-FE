import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { LoginFormDataType, SignUpFormDataType } from "../../../../types/usersType";
import AuthForm from "../../components/auth/AuthForm";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../app/store";
import { setThemeMode } from "../../../theme/themeSlice";
import { useGetQuery } from "../../../../hooks";
import { userLogin, selectUser } from "../..";

const AuthContainer: React.FC = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const mode = useGetQuery("mode");
  const userData = useSelector(selectUser)

  //useGetQuery사용
  useEffect(() => {
    setIsSignUp(mode === "signup");
  }, [mode]);

  const toggleForm = () => {
    navigate(`?mode=${isSignUp ? "login" : "signup"}`);
  };

  const onSubmit: SubmitHandler<SignUpFormDataType & LoginFormDataType> = async (data) => {
    if (isSignUp) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_AUTH_API_URL}/signup`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setSignUpSuccess(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error:", error.response?.data.message);
          if (error.response?.data.message === "Email already in use") {
            alert("이미 사용중인 이메일입니다.");
          } else {
            alert("이미 사용중인 닉네임입니다.");
          }
        } else {
          console.error("Unexpected Error:", error);
        }
      }
    } else {
      try {
        dispatch(userLogin({ loginData: data }))
        dispatch(setThemeMode(userData.themeMode))
        navigate("/");
        setTimeout(()=> window.location.reload(), 300)
      } catch (error) {
        console.error("로그인 요청 중 오류 발생:", error);
      }
    }
  };

  return <AuthForm isSignUp={isSignUp} onSubmit={onSubmit} toggleForm={toggleForm} signUpSuccess={signUpSuccess} />;
};

export default AuthContainer;
