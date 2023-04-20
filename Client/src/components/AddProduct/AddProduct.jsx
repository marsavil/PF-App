import React, { useState } from "react";
import "./addProduct.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    brand: "",
    description: "",
    stock: "",
    category: "",
  });

  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/products", formData);
      if (response) {
        toast.success("Producto agregado exitosamente");
      }
    } catch (error) {
      toast.error("Error al agregar el producto");
      throw new Error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <h2>Agregar Producto</h2>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio:</label>
            <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="image">Imagen:</label>
            <input type="text" name="image" id="image" value={formData.image} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="brand">Marca:</label>
            <input type="text" name="brand" id="brand" value={formData.brand} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="stock">Cantidad en Stock:</label>
            <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="category">Categoría:</label>
            <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} />
          </div>
          <div className="form-group form-group-description">
            <label htmlFor="description">Descripción:</label>
            <textarea name="description" id="description" value={formData.description} onChange={handleChange} />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? <BeatLoader color={"#ffffff"} size={7} /> : "Agregar Producto"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
