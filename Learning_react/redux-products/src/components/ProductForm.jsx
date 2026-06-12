import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/products/productSlice";

export default function ProductForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("electronics");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !price) {
      return;
    }

    const product = {
      title,
      price: Number(price),
      description: description || "New product added via form",
      category: category || "general",
      image:
        image || "https://via.placeholder.com/120?text=No+Image",
    };

    dispatch(addProduct(product));

    setTitle("");
    setPrice("");
    setImage("");
    setDescription("");
    setCategory("electronics");
  };

  return (
    <div className="product-form container">
      <h2>Add a new product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Product title"
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          min="0"
        />

        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL (optional)"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          rows="3"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="general">General</option>
        </select>

        <button type="submit">Add product</button>
      </form>
    </div>
  );
}
