
// mport React, { useEffect, useState } from "react";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import CircularProgress from "@mui/material/CircularProgress";
// import Stack from "@mui/material/Stack";
// export interface Rating {
//   rate: number;
//   count: number;
// }

// export interface Product {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   category: string;
//   image: string;
//   rating?: Rating;
// }

// export default function Home1() {
//   return (
//     <div>



//     </div>
//   )
// }

// import React, { useEffect, useState } from "react";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import type { SelectChangeEvent } from "@mui/material/Select";
// import "./Home.css"; 
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import CardActionArea from '@mui/material/CardActionArea';
// import CardActions from '@mui/material/CardActions';
// import { useNavigate } from "react-router-dom";
// interface Rating {
//   rate: number;
//   count: number;
// }

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   category: string;
//   image: string;
//   rating: Rating;
// }

// export default function Home() {
// const [categories,setCategories]=useState<string[]>([]);
// const [activeCategory,setActiveCategory]=useState<string>("");
// const[sortOrder,setSortOrder]=useState<"asc"|"desc">("asc");
//   const[product,setProducts]=useState<Product[]>([]);
//   const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
//   const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

// useEffect(()=>{
// setLoadingCategories(true);
// fetch("https://fakestoreapri.com/products/categories")
// .then((res)=>{
//   if(!res.ok)throw new Error ("Failed to fetch categories");
//   return res.json();
// })

// .then ((data:string[])=>{
//    console.log("Categories fetched from API:", data);
//   setCategories(data);
//   if(data.length>0)setActiveCategory(data[0]);
// })
// .catch ((err)=>{
//   console.error(err);
//   setError("Error")
// })
// .finally(()=>setLoadingCategories(false));
// },[])

//   const [products, setProducts] = useState<Product[]>([]);
//   const [activeCategory, setActiveCategory] =
//     useState<string>("men's clothing");
// const navigate = useNavigate();

//   const [limit, setLimit] = useState<number>(4); 

//   useEffect(() => {
//     fetch("https://fakestoreapi.com/products?sort=desc")
//       .then((res) => res.json())
//       .then((data: Product[]) => setProducts(data))
//       .catch((err) => console.error(err));
//   }, []);


//   const categories = Array.from(new Set(products.map((p) => p.category)));

//   const handleChange = (event: SelectChangeEvent) => {
//     setActiveCategory(event.target.value);
//   };

//   const filteredProducts = activeCategory
//     ? products.filter((p) => p.category === activeCategory)
//     : [];
// const [showForm, setShowForm] = useState(false); 
// const [newProduct, setNewProduct] = useState({
//   title: "",
//   price: "",
//   description: "",
//   image: "",
//   category: "",
// });
//add new product
// const handleSubmit = () => {
//   fetch("https://fakestoreapi.com/products", {
//     method: "POST",
//     body: JSON.stringify({
//       title: newProduct.title,
//       price: parseFloat(newProduct.price),
//       description: newProduct.description,
//       image: newProduct.image,
//       category: newProduct.category,
//     }),
//     headers: { "Content-Type": "application/json" },
//   })
//     .then((res) => res.json())
//     .then((json) => {
//       console.log(json);
//       setProducts((prev) => [...prev, json]); //
//       setShowForm(false); 
//       setNewProduct({ title: "", price: "", description: "", image: "", category: "" }); // reset
//     })
//     .catch((err) => console.error(err));
// };

//  return (
//     <div className="home-container">
//       <h1 className="home-title">🛍️ Products by Category</h1>

//       <Box className="category-select-box">
//         <FormControl sx={{ minWidth: 220 }}>
//           <InputLabel id="category-select-label">Select Category</InputLabel>
//          <Select
//   labelId="category-select-label"
//   id="category-select"
//   value={categories.includes(activeCategory) ? activeCategory : ""}
//   label="Select Category"
//   onChange={handleChange}
// >
// {categories.map((category) => (
//               <MenuItem key={category} value={category}>
//                 {category}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Box>

//       <h2 className="category-title">{activeCategory}</h2>

//       <div
//         className="games-grid"
//         style={{
//           gridTemplateColumns: `repeat(${limit}, 1fr)`,
//         }}
//       >
//         {filteredProducts.map((product) => (
//   <Card key={product.id} sx={{ maxWidth: 400, margin: "10px", boxShadow: 3 }}>
//     <CardActionArea>
//       <CardMedia
//         component="img"
//         height="180"
//         image={product.image}
//         alt={product.title}
//         sx={{ objectFit: "contain", backgroundColor: "#f9f9f9" }}
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h6" component="div" noWrap>
//           {product.title}
//         </Typography>
//         <Typography
//           variant="body2"
//           color="text.secondary"
//           sx={{
//             minHeight: 60,
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//           }}
//         >
//           {product.description.length > 80
//             ? product.description.slice(0, 80) + "..."
//             : product.description}
//         </Typography>
//         <Typography variant="h6" color="primary" sx={{ marginTop: "10px" }}>
//           ${product.price.toFixed(2)}
//         </Typography>
//       </CardContent>
//     </CardActionArea>
//     <CardActions>
//   <Button
//     size="small"
//     color="primary"
//     onClick={() => navigate(`/products/${product.id}`)}
//   >
//     Details
//   </Button>
// </CardActions>

//   </Card>
// ))}

      // </div>
{/* <div className="game-card add-product-card">
  {showForm && (
  <div className="product-form">

    <input
      type="text"
      placeholder="Title"
      value={newProduct.title}
      onChange={(e) =>
        setNewProduct({ ...newProduct, title: e.target.value })
      }
    />
    <input
      type="number"
      placeholder="Price"
      value={newProduct.price}
      onChange={(e) =>
        setNewProduct({ ...newProduct, price: e.target.value })
      }
    />
    <input
      type="text"
      placeholder="Description"
      value={newProduct.description}
      onChange={(e) =>
        setNewProduct({ ...newProduct, description: e.target.value })
      }
    />
    <input
      type="text"
      placeholder="Image URL"
      value={newProduct.image}
      onChange={(e) =>
        setNewProduct({ ...newProduct, image: e.target.value })
      }
    />
    <input
      type="text"
      placeholder="Category"
      value={newProduct.category}
      onChange={(e) =>
        setNewProduct({ ...newProduct, category: e.target.value })
      }
    />
    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={() => setShowForm(false)}>Cancel</button>
    </div>
  </div>
)}

  <button className="add-btn" onClick={() => setShowForm(true)}>
    ➕ Add Product
  </button>
</div> */}


    // </div>
//   );
// }


//searchhh


// import TextField from "@mui/material/TextField";

// export default function Home() {
//   const [searchTerm, setSearchTerm] = useState("");

//   // ... kod tjetër

//   // Këtu filtrojmë produktet sipas termit të kërkimit
//   const filteredProducts = product.filter((p) =>
//     p.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>🛍️ Products by Category</h1>

//       {/* Kërkim */}
//       <TextField
//         label="Search products..."
//         variant="outlined"
//         size="small"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         sx={{ marginBottom: 2, width: "250px" }}
//       />

//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//         {filteredProducts.map((p) => (
//           <Card key={p.id} sx={{ width: 250 }}>
//             {/* ... pjesa tjetër e kartës */}
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
