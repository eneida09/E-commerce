import React, { useState } from "react";
import { Box, Button, TextField, Typography, Alert, Paper } from "@mui/material";
import { useUser } from "./UserContext";

export default function LoginForm() {
  const { user, setUser } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
        const usersRes = await fetch("https://fakestoreapi.com/users?limit");
        const users = await usersRes.json();
        const foundUser = users.find((u: any) => u.username === username);

        if (foundUser) {
          setUser(foundUser); 
          localStorage.setItem("userData", JSON.stringify(foundUser));
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
    localStorage.removeItem("userData");
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      {user ? (
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h6">
            Welcome, {user.name.firstname.toUpperCase()} {user.name.lastname.toUpperCase()}!
          </Typography>
          <Paper sx={{ p: 2 }}>
            <Typography variant="body2"><strong>Username:</strong> {user.username}</Typography>
            <Typography variant="body2"><strong>Email:</strong> {user.email}</Typography>
            <Typography variant="body2"><strong>Phone:</strong> {user.phone}</Typography>
            <Typography variant="body2"><strong>Address:</strong></Typography>
            <Box ml={2}>
              <Typography variant="body2"><strong>Street:</strong> {user.address.street} {user.address.number}</Typography>
              <Typography variant="body2"><strong>City:</strong> {user.address.city}</Typography>
              <Typography variant="body2"><strong>Zipcode:</strong> {user.address.zipcode}</Typography>
              <Typography variant="body2"><strong>Geo:</strong> lat {user.address.geolocation.lat}, long {user.address.geolocation.long}</Typography>
            </Box>
          </Paper>
          <Button variant="outlined" onClick={handleLogout}>Logout</Button>
        </Box>
      ) : (
        <>
          <Typography variant="h6" mb={2}>Login</Typography>
          {error && <Alert severity="error" sx={{ mb: 1 }}>{error}</Alert>}

          <TextField label="Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
          <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />

          <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>Login</Button>
        </>
      )}
    </Box>
  );
}
