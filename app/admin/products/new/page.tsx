import { createProduct } from '../../actions';

const BooleanSelect = ({ name, label }: { name: string; label: string }) => (
  <div className="form-group">
    <label htmlFor={name} className="form-label">{label}:</label>
    <select id={name} name={name} defaultValue="false" className="form-input">
      <option value="true">TRUE</option>
      <option value="false">FALSE</option>
    </select>
  </div>
);

export default function NewProductPage() {
  return (
    <div className="admin-container">
      <h1>Añadir Nuevo Producto</h1>

      <form action={createProduct} className="admin-form">

        <div className="form-group">
          <label>Nombre</label>
          <input name="name" required />
        </div>

        <div className="form-group">
          <label>Precio</label>
          <input name="price" type="number" required />
        </div>

        <div className="form-group">
          <label>Precio Antiguo</label>
          <input name="oldPrice" type="number" />
        </div>

        <div className="form-group">
          <label>Imagen Principal</label>
          <input name="imageUrl" />
        </div>

        <div className="form-group">
          <label>Imagen Secundaria</label>
          <input name="imageUrl2" />
        </div>

        <div className="form-group">
          <label>Video</label>
          <input name="videoUrl" />
        </div>

        <div className="form-group">
          <label>Galería</label>
          <textarea name="galleryImages" />
        </div>

        <div className="form-group">
          <label>Categoría</label>
          <input name="categoria" />
        </div>

        <div className="form-group">
          <label>Texto Oferta</label>
          <input name="texto_oferta" />
        </div>

        <div className="form-group">
          <label>
            <input type="checkbox" name="inStock" defaultChecked />
            En Stock
          </label>
        </div>

        <div className="form-grid">
          <BooleanSelect name="es_mas_vendido" label="Más Vendido" />
          <BooleanSelect name="es_destacado_semana" label="Destacado Semana" />
          <BooleanSelect name="es_destacado_hogar" label="Destacado Hogar" />
        </div>

        <button type="submit" className="admin-submit-btn">
          Guardar Producto
        </button>

      </form>
    </div>
  );
}
