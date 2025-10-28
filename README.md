# 🛒 React E-Commerce App (FakeStoreAPI)

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue)
![Material UI](https://img.shields.io/badge/Material_UI-5.15-blue)
![License](https://img.shields.io/badge/License-MIT-green)

A **React-based e-commerce web application** using [FakeStoreAPI](https://fakestoreapi.com/) to fetch pseudo-real products for demonstration purposes.  
Supports **CRUD operations**, category filtering, search, sorting, and admin/user roles.


---

## ⚡ Features

- **Product Listing**: Fetch all products from FakeStoreAPI.  
- **Category Filter**: Filter products by category.  
- **Search & Sort**: Search products by title; sort A-Z or Z-A.  
- **CRUD Operations** (Admin only):
  - Add new products
  - Edit existing products
  - Delete products (with confirmation)
- **Responsive UI**: Using Material UI cards and modals.  
- **Admin/User Roles**: Admin can manage products; users can view products.

---

## 🛠 Tech Stack

- React 18 + TypeScript  
- Material UI  
- React Router v6  
- FakeStoreAPI as backend  
- Fetch API for HTTP requests  

---

## 🔗 API Endpoints

**Products**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /products | Fetch all products |
| GET | /products/:id | Fetch single product |
| GET | /products/category/:category | Fetch products by category |
| POST | /products | Simulate adding a product |
| PUT/PATCH | /products/:id | Simulate updating a product |
| DELETE | /products/:id | Simulate deleting a product |

> **Note:** POST, PUT, PATCH, DELETE are **simulated**; changes are only reflected in frontend state.

---

## 📌 How It Works

### Fetch Products
```ts
const endpoint = searchTerm
  ? "https://fakestoreapi.com/products"
  : `https://fakestoreapi.com/products/category/${activeCategory}`;

fetch(endpoint)
  .then(res => (res.ok ? res.json() : Promise.reject("Failed")))
  .then((data: Product[]) => {
    const filtered = searchTerm
      ? data.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
      : data;

    const sortedData = sortOrder === "asc"
      ? filtered.sort((a, b) => a.title.localeCompare(b.title))
      : filtered.sort((a, b) => b.title.localeCompare(a.title));

    setProducts(sortedData);
  })
  .catch(() => setError("Error fetching products"))
  .finally(() => setLoadingProducts(false));


Add / Update / Delete Products (Admin Only)

Add: Opens modal, fill form, product added to frontend state.

Update: Open product modal pre-filled with data, save updates to state.

Delete: Removes product from frontend state.

⚠️ Refreshing the page will reset all changes because FakeStoreAPI does not persist POST/PUT/DELETE requests.

🎨 UI Components

Product Cards: Show product image, title, description, price, and buttons for details/update/delete.

Modal Forms: Add and edit products using a reusable AddProductForm component.

Filter & Sort: Material UI Select inputs for category filter and sort order.

| Role  | Permissions                   |
| ----- | ----------------------------- |
| Admin | Add, edit, delete products    |
| User  | View, search, filter products |


