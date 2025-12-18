import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

function AdminUpload({ onUploadSuccess, editProduct, token }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "Unisex",
    stock: "",
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (editProduct) {
      setForm({
        name: editProduct.name,
        price: editProduct.price.toString(),
        description: editProduct.description,
        category: editProduct.category,
        stock: editProduct.stock.toString(),
      });
    }
  }, [editProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.price ||
      !form.description ||
      !form.category ||
      !form.stock
    ) {
      alert("Please fill all fields");
      return;
    }

    if (!editProduct && !file) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("stock", form.stock);
    if (file) formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      let res;
      if (editProduct) {
        res = await axios.put(
          `${API_BASE_URL}/api/products/${editProduct.productId}`,
          formData,
          config,
        );
      } else {
        res = await axios.post(
          `${API_BASE_URL}/api/products/upload`,
          formData,
          config,
        );
      }

      onUploadSuccess(res.data);
      setForm({
        name: "",
        price: "",
        description: "",
        category: "Unisex",
        stock: "",
      });
      setFile(null);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to save product. Make sure you are logged in as admin.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
      <div>
        <label className="form-label fw-semibold small">Product Name</label>
        <input
          type="text"
          placeholder="Enter product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="form-control"
        />
      </div>
      <div className="row g-3">
        <div className="col-6">
          <label className="form-label fw-semibold small">Price ($)</label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="form-control"
          />
        </div>
        <div className="col-6">
          <label className="form-label fw-semibold small">Stock</label>
          <input
            type="number"
            placeholder="0"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="form-control"
          />
        </div>
      </div>
      <div>
        <label className="form-label fw-semibold small">Description</label>
        <textarea
          placeholder="Product description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="form-control"
          rows="3"
        />
      </div>
      <div>
        <label className="form-label fw-semibold small">Category</label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="form-select"
        >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
          <option value="Accessories">Accessories</option>
          <option value="Unisex">Unisex</option>
        </select>
      </div>
      <div>
        <label className="form-label fw-semibold small">
          Image {editProduct ? "(optional — leave empty to keep current)" : ""}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-dark mt-2">
        {editProduct ? "Update Product" : "Upload Product"}
      </button>
    </form>
  );
}

export default AdminUpload;
