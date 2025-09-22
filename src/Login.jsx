// LoginPage.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

 function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Login function
  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important for cookies
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ " + data.message);
        setIsLoggedIn(true);
      } else {
        setMessage("❌ " + data.error);
      }
    } catch (error) {
      setMessage("⚠️ Something went wrong");
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      setMessage("✅ " + data.message);
      setIsLoggedIn(false);
      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage("⚠️ Something went wrong");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: "100%" }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: "20px",
            textAlign: "center",
            background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            color: "white",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {isLoggedIn ? "Welcome Back 🎉" : "Login"}
          </Typography>

          {!isLoggedIn ? (
            <>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "white",
                    borderRadius: "12px",
                  },
                }}
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "white",
                    borderRadius: "12px",
                  },
                }}
              />

              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  background: "rgba(255,255,255,0.2)",
                  "&:hover": { background: "rgba(255,255,255,0.3)" },
                }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "bold",
                background: "rgba(255,255,255,0.2)",
                "&:hover": { background: "rgba(255,255,255,0.3)" },
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}

          {message && (
            <Typography
              variant="body1"
              sx={{ mt: 3, fontWeight: "bold", color: "yellow" }}
            >
              {message}
            </Typography>
          )}
        </Paper>
      </motion.div>
    </Container>
  );
}
export default LoginPage