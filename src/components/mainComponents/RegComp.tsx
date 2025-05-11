import React, { useState } from "react";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PageBox from "../UI/boxes/PageBox";
import CustomInput from "../UI/inputs/CustomInput";
import LoginButton from "../UI/buttons/LoginButton";

const RegComp = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !username || !password) {
      setError("Всі поля обов'язкові для заповнення");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        email,
        username,
        password,
      });

      console.log("Успішна реєстрація:", response.data);
      navigate("/login");
    } catch (err: any) {
      const msg = err.response?.data?.message;
      if (Array.isArray(msg)) {
        setError(msg.join(" "));
      } else {
        setError(msg || "Помилка при реєстрації");
      }
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
            src="/images/3.jpg"
            alt="Ілюстрація реєстрації"
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
              Реєстрація
            </Box>

            <form
              onSubmit={handleRegister}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <CustomInput
                type="email"
                placeholder="Ел. пошта"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <CustomInput
                type="text"
                placeholder="Ім’я користувача"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <CustomInput
                type="password"
                placeholder="Пароль"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <Box
                  sx={{ color: "white", fontSize: "14px", textAlign: "center" }}
                >
                  {error}
                </Box>
              )}
              <LoginButton type="submit">Зареєструватися</LoginButton>
            </form>

            <Link
              to="/login"
              style={{
                color: "#ffffff",
                fontSize: "18px",
                textDecoration: "underline",
                marginTop: "12px",
                textAlign: "center",
              }}
            >
              Вже маєте акаунт? Увійти
            </Link>
          </Box>
        </Box>
      </PageBox>
    </Box>
  );
};

export default RegComp;
