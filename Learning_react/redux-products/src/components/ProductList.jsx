import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
} from "../features/products/productSlice";

export default function ProductList() {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector(
    (state) => state.products
  );

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEdit = (product) => {
    setEditId(product.id);
    setEditTitle(product.title);
    setEditPrice(product.price);
  };

  const handleUpdate = () => {
    dispatch(
      updateProduct({
        id: editId,
        updatedData: {
          title: editTitle,
          price: Number(editPrice),
        },
      })
    );

    setEditId(null);
    setEditTitle("");
    setEditPrice("");
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className="container">
      <h2>🛍️ Products</h2>

      <div className="grid">
        {items.map((product) => (
          <div key={product.id} className="card">

            {/* EDIT MODE */}
            {editId === product.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Title"
                />

                <input
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  placeholder="Price"
                />

                <button className="save-btn" onClick={handleUpdate}>
                  Save
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => setEditId(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div className="title">{product.title}</div>
                <div className="price">₹ {product.price}</div>

                <button
                  className="edit-btn"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    dispatch(deleteProduct(product.id))
                  }
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}