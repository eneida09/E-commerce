import * as React from "react";
import { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const handleLogin = async () => {
    setError("");
    try {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);

        const usersRes = await fetch("https://fakestoreapi.com/users?limit");
        const users = await usersRes.json();
        const foundUser = users.find((u: any) => u.username === username);

        if (foundUser) {
          setUser(foundUser);
          localStorage.setItem("user", JSON.stringify(foundUser));
        }

        setUsername("");
        setPassword("");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error(err);
      setError("Error connecting to API");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  if (user) {
    // Profile view
    const { name, email, phone, username, address } = user;
    return (
      <Box sx={{ maxWidth: 500, mx: "auto", mt: 5, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h5" mb={2}>Profile</Typography>

        <Typography><strong>Name:</strong> {name.firstname} {name.lastname}</Typography>
        <Typography><strong>Username:</strong> {username}</Typography>
        <Typography><strong>Email:</strong> {email}</Typography>
        <Typography><strong>Phone:</strong> {phone}</Typography>
        <Typography>
          <strong>Address:</strong> {address.number} {address.street}, {address.city}, {address.zipcode}
        </Typography>
        <Typography>
          <strong>Geo:</strong> lat {address.geolocation.lat}, long {address.geolocation.long}
        </Typography>

      </Box>
    );
  }

  // Login form view
  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h6" mb={2}>Login</Typography>

      {error && <Alert severity="error" sx={{ mb: 1 }}>{error}</Alert>}

      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
}
