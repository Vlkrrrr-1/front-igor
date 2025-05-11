import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

const MainComp = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: "rgb(253, 242, 240)",
        minHeight: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 4, md: 8 },
          maxWidth: "1400px",
          width: "100%",
          paddingX: { xs: 2, md: 6 },
        }}
      >
        {/* Текст */}
        <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              marginBottom: 2,
              color: "rgb(30, 30, 47)",
              fontSize: { xs: "2rem", md: "3.5rem" },
            }}
          >
            Досягай кращого в пізнанні
          </Typography>

          <Typography
            variant="h6"
            sx={{
              marginBottom: 4,
              color: "rgb(70, 70, 90)",
              fontSize: { xs: "1rem", md: "1.5rem" },
            }}
          >
            Виконуй завдання та дізнавайся нове, поліпшуючи власні знання у
            світовій історії
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate("/home")}
            sx={{
              backgroundColor: "rgb(41, 121, 255)",
              paddingX: 5,
              paddingY: 2,
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderRadius: "12px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "rgb(21, 101, 192)",
              },
            }}
          >
            Почати
          </Button>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src="/images/1.jpg"
            alt="Challenge"
            sx={{
              width: { xs: "90%", md: "700px" },
              maxWidth: "700px",
              borderRadius: "20px",
              boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.25)",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MainComp;
