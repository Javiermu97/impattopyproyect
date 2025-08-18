import { createProduct } from '../../actions';

export default function NewProductPage() {
  return (
    <div className="admin-container">
      <h1>Añadir Nuevo Producto</h1>
      <form action={createProduct} className="admin-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Nombre del Producto:</label>
          <input id="name" name="name" type="text" required className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Descripción:</label>
          <textarea id="description" name="description" required className="form-textarea" />
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="price" className="form-label">Precio (Gs.):</label>
            <input id="price" name="price" type="number" required className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="oldPrice" className="form-label">Precio Antiguo (Opcional):</label>
            <input id="oldPrice" name="oldPrice" type="number" className="form-input" />
          </div>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="imageUrl" className="form-label">URL Imagen Principal:</label>
            <input id="imageUrl" name="imageUrl" type="text" required className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl2" className="form-label">URL Imagen Secundaria (Opcional):</label>
            <input id="imageUrl2" name="imageUrl2" type="text" className="form-input" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="videoUrl" className="form-label">URL del Video (Opcional):</label>
          <input id="videoUrl" name="videoUrl" type="text" className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="categoria" className="form-label">Categoría:</label>
          <input id="categoria" name="categoria" type="text" className="form-input" />
        </div>
        <fieldset className="form-fieldset">
          <legend className="form-label">Opciones</legend>
          <div className="form-checkbox-group">
            <input id="inStock" name="inStock" type="checkbox" defaultChecked />
            <label htmlFor="inStock">En Stock</label>
          </div>
          <div className="form-checkbox-group">
            <input id="es_mas_vendido" name="es_mas_vendido" type="checkbox" />
            <label htmlFor="es_mas_vendido">Es Más Vendido</label>
          </div>
          <div className="form-checkbox-group">
            <input id="es_destacado" name="es_destacado" type="checkbox" />
            <label htmlFor="es_destacado">Es Destacado (General)</label>
          </div>
          <div className="form-checkbox-group">
            <input id="es_destacado_hogar" name="es_destacado_hogar" type="checkbox" />
            <label htmlFor="es_destacado_hogar">Es Destacado (Hogar)</label>
          </div>
        </fieldset>
        <button type="submit" className="admin-submit-btn">
          Guardar Producto
        </button>
      </form>
    </div>
  );
}