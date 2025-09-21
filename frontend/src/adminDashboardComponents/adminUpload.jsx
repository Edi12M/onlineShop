import { useState } from "react";
import axios from "axios";

function AdminUpload({ onUploadSuccess }) {
  const [form, setForm] = useState({ name: "", price: "", description: "", category: "", stock: "" });
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
      await axios.post("http://localhost:5145/api/products/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product uploaded!");
      setForm({ name: "", price: "", description: "", category: "", stock: "" });
      setFile(null);
      onUploadSuccess(); // refresh product list
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <input type="text" placeholder="Product name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input type="number" placeholder="Price" onChange={e => setForm({ ...form, price: e.target.value })} />
      <input type="text" placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })} />
      <input type="text" placeholder="Category" onChange={e => setForm({ ...form, category: e.target.value })} />
      <input type="number" placeholder="Stock" onChange={e => setForm({ ...form, stock: e.target.value })} />
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default AdminUpload;
