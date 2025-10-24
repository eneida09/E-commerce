import React from "react";
import { useCart } from "./context";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Cart() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        🛒 Your Cart
      </Typography>

      {cart.length === 0 && <Typography>Your cart is empty.</Typography>}

      {cart.map((item) => (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #ccc",
            padding: 1,
            borderRadius: 1,
            marginBottom: 2,
            gap: 2,
          }}
        >

          <Box
            component="img"
            src={item.image}
            alt={item.title}
            sx={{ width: 80, height: 80, objectFit: "contain", borderRadius: 1 }}
          />

          <Box sx={{ flex: 1 }}>
            <Typography>{item.title}</Typography>
            <Typography>Price: ${item.price.toFixed(2)}</Typography>
            <Typography>Quantity: {item.quantity}</Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button onClick={() => decreaseQuantity(item.id)}>-</Button>
            <Button onClick={() => increaseQuantity(item.id)}>+</Button>
            <Button color="error" onClick={() => removeFromCart(item.id)}>
              Remove
            </Button>
          </Box>
        </Box>
      ))}

      <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
    </Box>
  );
}
