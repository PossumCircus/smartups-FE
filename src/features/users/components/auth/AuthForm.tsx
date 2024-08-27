import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginFormDataType, SignUpFormDataType } from "../../../../types/usersType";
import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container } from "../../../../styles/mui/index";
import { useDebounce } from "../../hooks";
import axios from "axios";

interface AuthFormProps {
  signUpSuccess: boolean;
  isSignUp: boolean;
  onSubmit: SubmitHandler<SignUpFormDataType & LoginFormDataType>;
  toggleForm: () => void;
}

// 백앤드 닉네임 유효성검사
const AuthForm: React.FC<AuthFormProps> = ({ isSignUp, onSubmit, toggleForm, signUpSuccess }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormDataType & LoginFormDataType>({ mode: "all" });

  const password = watch("password");
  //이메일,닉네임 자동 중복 검사
  const debouncedSearchEmail = useDebounce(watch("email"), 200);
  const debouncedSearchUserName = useDebounce(watch("username"), 200);

  return (
    <Container component="main" maxWidth="xs">
      {signUpSuccess === false ? (
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link href="/">
            <Avatar alt="logo" src="/img/logo.png" sx={{ width: 60, height: 60, mb: 3 }} />
          </Link>
          <Typography component="h1" variant="h5" fontWeight="bold">
            {isSignUp ? "회원가입" : "로그인"}
          </Typography>
          <div>
            <p>테스트용 계정</p>
            <p>test@test.com</p>
            <p>test1234</p>
          </div>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일"
                  autoComplete="email"
                  {...register("email", {
                    required: "이메일을 입력해주세요",
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                      message: "유효한 이메일 주소를 입력해주세요",
                    },
                    validate: {
                      emailCheck: async () => {
                        if (isSignUp) {
                          try {
                            const response = await axios.post(
                              `${process.env.REACT_APP_AUTH_API_URL}/checkEmail`,
                              {
                                email: debouncedSearchEmail,
                              },
                              {
                                headers: {
                                  "Content-Type": "application/json",
                                },
                              }
                            );

                            const data = response.data;
                            console.log(data.message);
                            return data.message === false || "이미 존재하는 이메일입니다";
                          } catch (error) {
                            console.error("Error during email validation:", error);
                            return "이메일 중복 검사 중 오류가 발생했습니다";
                          }
                        }
                      },
                    },
                  })}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password", {
                    required: "비밀번호를 입력해주세요",
                    minLength: {
                      value: 8,
                      message: "비밀번호는 최소 8자 이상이어야 합니다",
                    },
                  })}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                />
              </Grid>
              {isSignUp && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="비밀번호확인"
                      type="password"
                      id="password_confirm"
                      autoComplete="password_confirm"
                      {...register("password_confirm", {
                        validate: (value: any) => value === password || "비밀번호가 일치하지 않습니다",
                      })}
                      error={Boolean(errors.password_confirm)}
                      helperText={errors.password_confirm?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="fullName"
                      required
                      fullWidth
                      id="fullName"
                      label="성함"
                      {...register("fullName", {
                        required: "성함을 입력해주세요",
                        minLength: {
                          value: 2,
                          message: "성함은 최소 2글자 이상이어야 합니다",
                        },
                        pattern: {
                          value: /^[가-힣]+$/,
                          message: "성함은 한글로만 입력해주세요",
                        },
                      })}
                      error={Boolean(errors.fullName)}
                      helperText={errors.fullName?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="username"
                      required
                      fullWidth
                      id="username"
                      label="닉네임"
                      {...register("username", {
                        required: "닉네임을 입력해주세요",
                        minLength: {
                          value: 2,
                          message: "닉네임은 최소 2글자 이상이어야 합니다",
                        },
                        maxLength: {
                          value: 8,
                          message: "닉네임은 최대 8글자 이하여야 합니다",
                        },
                        pattern: {
                          value: /^[가-힣a-zA-Z0-9]+$/,
                          message: "닉네임은 한글과 영어,숫자로만 입력해주세요",
                        },
                        validate: {
                          usernameCheck: async () => {
                            if (isSignUp) {
                              try {
                                const response = await axios.post(
                                  `${process.env.REACT_APP_AUTH_API_URL}/checkUserName`,
                                  {
                                    username: debouncedSearchUserName,
                                  },
                                  {
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                  }
                                );

                                const data = response.data;
                                console.log(data.message);
                                return data.message === false || "이미 존재하는 닉네임입니다";
                              } catch (error) {
                                console.error("Error during username validation:", error);
                                return "닉네임 중복 검사 중 오류가 발생했습니다";
                              }
                            }
                          },
                        },
                      })}
                      error={Boolean(errors.username)}
                      helperText={errors.username?.message}
                    />
                  </Grid>
                </>
              )}
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {isSignUp ? "회원가입" : "로그인"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <p className="text-center text-sm mt-4 cursor-pointer" onClick={toggleForm}>
                  {isSignUp ? "이미 계정이 있으신가요? 로그인" : "계정이 없으신가요? 가입하기"}
                </p>
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
        <div className="flex h-screen flex-col justify-center items-center mx-auto">
          <div className="flex flex-col justify-center items-center">
            <img src="/img/logo.png" alt="logo" className="w-20 h-20" />
            <p>회원가입 성공!</p>
            <Link href="/auth?mode=login">로그인 하러가기</Link>
          </div>
        </div>
      )}
    </Container>
  );
};

export default AuthForm;
