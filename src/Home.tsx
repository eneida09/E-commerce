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

import { useSearch } from "./SearchContext";
import { useUser } from "./UserContext";
import AddProductForm from "./AddProductForm";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id?: number; 
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: Rating;
}

export default function Home() {
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { searchTerm } = useSearch();
  const { user, isAdmin } = useUser();
  const [openAddModal, setOpenAddModal] = useState(false);
  //edit
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    setLoadingCategories(true);
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => (res.ok ? res.json() : Promise.reject("Failed")))
      .then((data: string[]) => {
        setCategories(data);
        if (data.length > 0) setActiveCategory(data[0]);
      })
      .catch(() => setError("Error fetching categories"))
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
      .then((res) => (res.ok ? res.json() : Promise.reject("Failed")))
      .then((data: Product[]) => {
    
        let filtered = searchTerm
          ? data.filter((p) =>
              p.title.toLowerCase().startsWith(searchTerm.toLowerCase())
            )
          : data;
//renditja
        const sortedData =
          sortOrder === "asc"
            ? filtered.sort((a, b) => a.title.localeCompare(b.title))
            : filtered.sort((a, b) => b.title.localeCompare(a.title));

        setProducts(sortedData);
      })
      //if have a error
      .catch(() => setError("Error fetching products"))
      
      .finally(() => setLoadingProducts(false));
  }, [activeCategory, sortOrder, searchTerm]);
//search
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleAddProduct = (newProd: Product) => {
    const productWithId: Product = {
      ...newProd,
      id: newProd.id ?? Math.floor(Math.random() * 100000),
    };

    if (productWithId.category === activeCategory) {
      setProducts((prev) => [productWithId, ...prev]);
    }
  };
  const addButtonRef = React.useRef<HTMLButtonElement>(null);
  //edit
  const openEdit = (product: Product) => {
    setSelectedProduct(product);
    setOpenEditModal(true);
  };
  //function  save change products
  const handleEditProduct = (updatedProd: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProd.id ? updatedProd : p))
    );
  };
  //delete
  const handleDeleteProduct = (id?: number) => {
    if (!id) return;

    //confirm for user
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    // remove product from
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Box sx={{ padding: 2 }}>
      {user && isAdmin() && (
        <Button
          ref={addButtonRef}
          variant="contained"
          color="secondary"
          sx={{ mb: 2 }}
          onClick={() => setOpenAddModal(true)}
        >
          ➕ Add Product
        </Button>
      )}

      <Dialog
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <AddProductForm
            categories={categories}
            onSubmit={(newProd) => {
              handleAddProduct(newProd);
              setOpenAddModal(false);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddModal(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <AddProductForm
              categories={categories}
              initialData={selectedProduct}
              onSubmit={(updated) => {
                handleEditProduct(updated);
                setOpenEditModal(false);
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Typography variant="h4" sx={{ mb: 2 }}>
        🛍️ Products by Category
      </Typography>

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

      {loadingProducts && <p>Loading products...</p>}

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
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
                <Typography gutterBottom variant="h6" noWrap>
                  {p.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ minHeight: 60 }}
                >
                  {p.description.length > 80
                    ? p.description.slice(0, 80) + "..."
                    : p.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
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

              {user && isAdmin() && (
                <Button
                  size="small"
                  color="secondary"
                  variant="outlined"
                  onClick={() => openEdit(p)}
                >
                  Edit
                </Button>
              )}
              {user && isAdmin() && (
                <Button
                  size="small"
                  color="secondary"
                  variant="outlined"
                  onClick={() => handleDeleteProduct(p.id)}
                >
                  delete
                </Button>
              )}
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
