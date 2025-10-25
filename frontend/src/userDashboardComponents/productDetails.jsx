import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5145/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <img
              className="card-img-top mb-5 mb-md-0"
              src={`http://localhost:5145${product.imageUrl}`}
              alt={product.name}
            />
          </div>
          <div className="col-md-6">
            <h1 className="display-5 fw-bolder">{product.name}</h1>
            <div className="fs-5 mb-5">
              <span>${product.price}</span>
            </div>
            <p className="lead">
              {product.description || "No description available."}
            </p>
            <div className="d-flex">
              <Link to="/user-dashboard" className="btn btn-outline-dark flex-shrink-0">
                Back to Shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
