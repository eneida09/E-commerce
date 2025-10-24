import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();
  const handleShopNow = () => {
    navigate("/");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Box
        sx={{
          minHeight: "50vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          textAlign: "center",
          bgcolor: "#e0f7fa", 
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          color="primary"
          sx={{ mb: 3 }}
        >
          Welcome to Our Store
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mb: 5, maxWidth: 1000, lineHeight: 1.6 }}
        >
          We are passionate about providing the best products at the best prices.
          Our mission is to make online shopping fast, simple, and enjoyable.
          Join us and discover carefully selected products that ensure quality
          and satisfaction.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleShopNow}
        >
          Shop Now
        </Button>
      </Box>

      {/* Socials Section */}
      <Box
        sx={{
          textAlign: "center",
          py: 6,
          borderTop: "1px solid #ddd",
          bgcolor: "#f5f5f5",
        }}
      >
        <Typography variant="h6" fontWeight={600} mb={2}>
          Follow Us
        </Typography>

        <Stack direction="row" justifyContent="center" spacing={3}>
          <IconButton
            href="https://facebook.com"
            target="_blank"
            sx={{
              color: "#1877F2",
              "&:hover": { transform: "scale(1.1)" },
              transition: "0.3s",
            }}
          >
            <Facebook size={28} />
          </IconButton>

          <IconButton
            href="https://instagram.com"
            target="_blank"
            sx={{
              color: "#E4405F",
              "&:hover": { transform: "scale(1.1)" },
              transition: "0.3s",
            }}
          >
            <Instagram size={28} />
          </IconButton>

          <IconButton
            href="https://twitter.com"
            target="_blank"
            sx={{
              color: "#1DA1F2",
              "&:hover": { transform: "scale(1.1)" },
              transition: "0.3s",
            }}
          >
            <Twitter size={28} />
          </IconButton>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
        
          sx={{ mt: 3, fontSize: "0.9rem" }}
        >
          © {new Date().getFullYear()} YourStore. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutPage;
