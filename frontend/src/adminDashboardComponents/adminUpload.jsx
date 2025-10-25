import { useState } from "react";
import axios from "axios";

function AdminUpload({ onUploadSuccess }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "Unisex",
    stock: "",
  });
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !form.name || !form.price || !form.description || !form.category || !form.stock) {
      alert("Please fill all fields and select an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("stock", form.stock);
    formData.append("image", file);

    try {
      const res = await axios.post(
        "http://localhost:5145/api/products/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      onUploadSuccess(res.data); // send new product back to dashboard
      // reset form
      setForm({ name: "", price: "", description: "", category: "Unisex", stock: "" });
      setFile(null);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form d-flex flex-column gap-2">
      <input
        type="text"
        placeholder="Product name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="form-control"
      />
      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="form-control"
      />
      <input
        type="text"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="form-control"
      />
      <select
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="form-control"
      >
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Kids">Kids</option>
        <option value="Accessories">Accessories</option>
        <option value="Unisex">Unisex</option>
      </select>
      <input
        type="number"
        placeholder="Stock"
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
        className="form-control"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="form-control"
      />
      <button type="submit" className="btn btn-dark mt-2">
        Upload Product
      </button>
    </form>
  );
}

export default AdminUpload;
