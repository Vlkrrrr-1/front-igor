import React, { useState } from "react";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PageBox from "../UI/boxes/PageBox";
import CustomInput from "../UI/inputs/CustomInput";
import LoginButton from "../UI/buttons/LoginButton";
import axios from "axios";

const LoginComp = () => {
  const [emailOrUsername, setEmailOrUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        emailOrUsername,
        password,
      });
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("username", response.data.username);
      navigate("/");
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      alert("Помилка входу. Перевірте логін та пароль.");
    }
  };

  return (
    <Box sx={{ position: "relative", height: "93vh", overflow: "hidden" }}>
      <PageBox>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          <Box
            component="img"
            src="/images/2.jpg"
            alt="Ілюстрація входу"
            sx={{
              width: { xs: "100%", md: "50%" },
              height: "auto",
              borderRadius: "12px",
              objectFit: "cover",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Box
            sx={{
              background: "linear-gradient(135deg, #D00C85, #FF7FBF)",
              padding: "40px 30px",
              width: { xs: "100%", md: "400px" },
              borderRadius: "16px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <Box
              sx={{
                fontWeight: "bold",
                color: "white",
                fontSize: "32px",
                textAlign: "center",
              }}
            >
              Вхід
            </Box>

            <form
              onSubmit={handleLogin}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <CustomInput
                type="text"
                placeholder="Email або Ім’я користувача"
                autoComplete="username"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
              />
              <CustomInput
                type="password"
                placeholder="Пароль"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <LoginButton type="submit">Увійти</LoginButton>
            </form>

            <Link
              to="/registration"
              style={{
                color: "#ffffff",
                fontSize: "18px",
                textDecoration: "underline",
                marginTop: "12px",
                textAlign: "center",
              }}
            >
              Ще не маєте акаунта? Зареєструйтеся
            </Link>
          </Box>
        </Box>
      </PageBox>
    </Box>
  );
};

export default LoginComp;
