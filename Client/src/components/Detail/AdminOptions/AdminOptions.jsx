import React from "react";

const AdminOptions = ({ productDetail }) => {
  
  const handleEditProduct = () => {};

  const handleDeleteProduct = () => {};


  return (
    <section className="adminOptions">
      <h2>Opciones de administrador</h2>
      <div className="adminButtons">
        <button className="edit" onClick={handleEditProduct}>
          Editar producto
        </button>
        <button className="delete" onClick={handleDeleteProduct}>
          Eliminar producto
        </button>
      </div>
    </section>
  );
};

export default AdminOptions;
