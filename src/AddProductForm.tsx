import React, { useState } from "react";
import { Box, TextField, Button, Alert, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export interface Product {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
}

interface AddProductFormProps {
  categories: string[];
  initialData?: Partial<Product>;
  onSubmit: (product: Product) => void;
}

export default function AddProductForm({ categories, onSubmit, initialData }: AddProductFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!title || !price || !category || !image) {
      setError("Please fill all fields");
      return;
    }

    const product: Product = {
      id: initialData?.id,
      title,
      price: parseFloat(price),
      description,
      category,
      image,
      rating: initialData?.rating || { rate: 0, count: 0 },
    };

    onSubmit(product);

    if (!initialData) {
      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImage("");
      setError("");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}

      <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
      <TextField label="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
        </Select>
      </FormControl>

      <TextField label="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />

      <Button variant="contained" onClick={handleSubmit}>
        {initialData ? "Update Product" : "Add Product"}
      </Button>
    </Box>
  );
}
