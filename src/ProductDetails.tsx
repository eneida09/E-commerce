import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartProvider, useCart } from "./context";

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

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const { addToCart}=useCart()

  useEffect(() => {
    const fetchProduct = async (productId: number) => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!res.ok) throw new Error(`Product not found (status ${res.status})`);
        const data: Product = await res.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    const productId = Number(id);
    if (!id || isNaN(productId) || productId < 1 || productId > 20) {
      setError("Invalid or missing product ID. Use 1–20.");
      setLoading(false);
      return;
    }

    fetchProduct(productId);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
  ///card
  addToCart(product)
    console.log(`Added to cart: ${product.title}`);
  
  };

  if (loading) return <div>Loading product...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!product) return null;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>{product.title}</h2>
      <img
        src={product.image}
        alt={product.title}
        style={{ maxWidth: "100%", objectFit: "contain" }}
      />
      <p>{product.description}</p>
      <h3>${product.price.toFixed(2)}</h3>
      <p>Category: {product.category}</p>
      <p>
        Rating: {product.rating.rate} ({product.rating.count} reviews)
      </p>
      <button
        onClick={handleAddToCart}
        style={{
          padding: "10px 20px",
          backgroundColor: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
