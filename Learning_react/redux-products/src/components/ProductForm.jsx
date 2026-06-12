import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/products/productSlice";

export default function ProductForm() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !price) return;

    dispatch(
      addProduct({
        title,
        price: Number(price),
      })
    );

    setTitle("");
    setPrice("");
  };

  return (
    <div>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}