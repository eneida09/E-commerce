import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useSearch } from "./SearchContext";
interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export default function Home() {
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [product, setProducts] = useState<Product[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { searchTerm } = useSearch();

  useEffect(() => {
    setLoadingCategories(true);
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      })

      .then((data: string[]) => {
        console.log("Categories fetched from API:", data);
        setCategories(data);
        if (data.length > 0) setActiveCategory(data[0]);
      })
      .catch((err) => {
        console.error(err);
        setError("Error");
      })
      .finally(() => setLoadingCategories(false));
  }, []);

 useEffect(() => {
  if (!activeCategory && !searchTerm) return; 

  setLoadingProducts(true);
  setError(null);

  const endpoint = searchTerm
    ? "https://fakestoreapi.com/products"
    : `https://fakestoreapi.com/products/category/${activeCategory}`;

  fetch(endpoint)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.text(); 
    })
    .then((text) => {
      if (!text) return []; 
      return JSON.parse(text); 
    })
    .then((data: Product[]) => {
      const filtered = searchTerm
        ? data.filter((p) =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : data;

      const sortedData =
        sortOrder === "asc"
          ? [...filtered].sort((a, b) => a.title.localeCompare(b.title))
          : [...filtered].sort((a, b) => b.title.localeCompare(a.title));

      setProducts(sortedData);
      setError(null);
    })
    .catch((err) => {
      console.error("Error fetching products:", err);
      setError("Error fetching products");
    })
    .finally(() => setLoadingProducts(false));
}, [activeCategory, sortOrder, searchTerm]);


  const filteredProducts = product.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="home-title">🛍️ Products by Category</h1>

      {/* SElect category */}

      {loadingCategories && <p>Loading categories...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          value={activeCategory}
          label="Category"
          onChange={(e: SelectChangeEvent) => setActiveCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Sort */}
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="sort-select-label">Sort</InputLabel>
        <Select
          labelId="sort-select-label"
          value={sortOrder}
          label="Sort"
          onChange={(e: SelectChangeEvent) =>
            setSortOrder(e.target.value as "asc" | "desc")
          }
        >
          <MenuItem value="asc">A-Z</MenuItem>
          <MenuItem value="desc">Z-A</MenuItem>
        </Select>
      </FormControl>

      <hr />

      {/* Products */}
      {loadingProducts && <p>Loading products...</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filteredProducts.map((p) => (
          <Card key={p.id} sx={{ width: 250 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="250"
                image={p.image}
                alt={p.title}
                sx={{ objectFit: "contain" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div" noWrap>
                  {p.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    minHeight: 60,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {p.description.length > 80
                    ? p.description.slice(0, 80) + "..."
                    : p.description}
                </Typography>
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ marginTop: "10px" }}
                >
                  ${p.price.toFixed(2)}
                </Typography>
              </CardContent>
            </CardActionArea>

            <CardActions>
              <Button
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => navigate(`/products/${p.id}`)}
              >
                Details
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}
