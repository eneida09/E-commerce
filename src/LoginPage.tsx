import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Alert, Paper } from "@mui/material";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { user, setUser } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<any | null>(null);
const navigate = useNavigate();

  //  Sinkronizo editedUser kur user ndryshon  pas refresh
  useEffect(() => {
    setEditedUser(user);
  }, [user]);

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
        const usersRes = await fetch("https://fakestoreapi.com/users");
        const users = await usersRes.json();
        const foundUser = users.find((u: any) => u.username === username);

        if (foundUser) {
          const isAdminUser = foundUser.id === 2;
          const updatedUser = { ...foundUser, role: isAdminUser ? "admin" : "user" };

          setUser(updatedUser);
          localStorage.setItem("userData", JSON.stringify(updatedUser));
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

  // Logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("userData");
    setEditedUser(null);
    setEditing(false);
  };

  //  Edit use data
  const handleEditChange = (field: string, value: string) => {
    if (!editedUser) return;
    const newUser = { ...editedUser };
    const [main, sub] = field.split(".");
    if (sub) (newUser as any)[main][sub] = value;
    else (newUser as any)[field] = value;
    setEditedUser(newUser);
  };

  const handleSave = () => {
    if (editedUser) {
      setUser(editedUser);
      localStorage.setItem("userData", JSON.stringify(editedUser));
      setEditing(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 800,
          p: 4,
          borderRadius: 3,
          boxShadow: 5,
        }}
      >
        {user ? (
          <Box display="flex" flexDirection="column" gap={3}>
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              Welcome, {user.name.firstname.toUpperCase()} {user.name.lastname.toUpperCase()} ({user.role})
            </Typography>

           
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              }}
            >
              <TextField
                label="Username"
                fullWidth
                disabled={!editing}
                value={editedUser?.username || ""}
                onChange={(e) => handleEditChange("username", e.target.value)}
              />
              <TextField
                label="Email"
                fullWidth
                disabled={!editing}
                value={editedUser?.email || ""}
                onChange={(e) => handleEditChange("email", e.target.value)}
              />
              <TextField
                label="Phone"
                fullWidth
                disabled={!editing}
                value={editedUser?.phone || ""}
                onChange={(e) => handleEditChange("phone", e.target.value)}
              />
              <TextField
                label="City"
                fullWidth
                disabled={!editing}
                value={editedUser?.address?.city || ""}
                onChange={(e) => handleEditChange("address.city", e.target.value)}
              />
              <TextField
                label="Street"
                fullWidth
                disabled={!editing}
                value={`${editedUser?.address?.street || ""} ${editedUser?.address?.number || ""}`}
                onChange={(e) => handleEditChange("address.street", e.target.value)}
              />
              <TextField
                label="Zipcode"
                fullWidth
                disabled={!editing}
                value={editedUser?.address?.zipcode || ""}
                onChange={(e) => handleEditChange("address.zipcode", e.target.value)}
              />
              <TextField
                label="Geo (lat, long)"
                fullWidth
                disabled
                value={`${editedUser?.address?.geolocation?.lat}, ${editedUser?.address?.geolocation?.long}`}
              />
            </Box>

            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button variant="outlined" color="error" onClick={handleLogout}>
                Logout
              </Button>

              {editing ? (
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Save Changes
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => {
                    setEditing(true);
                  }}
                >
                  Edit Profile
                </Button>
              )}
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography variant="h5" textAlign="center" mb={2}>
              Login
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

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

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, py: 1.5 }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        )}
        <br/>
        <Box mt={3} textAlign="center">
  <Button
    variant="outlined"
    onClick={() => navigate("/")}
  >
    Go to Home Page
  </Button>
</Box>

      </Paper>
    </Box>
    
  );
}
