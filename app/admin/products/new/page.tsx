import { createProduct } from '../../actions';

const BooleanSelect = ({ name, label }: { name: string, label: string }) => (
    <div className="form-group">
        <label htmlFor={name} className="form-label">{label}:</label>
        <select id={name} name={name} defaultValue="null" className="form-input">
            <option value="null">NULO</option>
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
          <label htmlFor="nombre" className="form-label">Nombre del Producto</label>
          <input id="nombre" name="nombre" type="text" required className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea id="descripcion" name="descripcion" className="form-textarea" />
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="precio" className="form-label">Precio</label>
            <input id="precio" name="precio" type="number" required className="form-input" placeholder="Ej: 150000" />
          </div>
          <div className="form-group">
            <label htmlFor="precio_anterior" className="form-label">Precio Anterior</label>
            <input id="precio_anterior" name="precio_anterior" type="number" className="form-input" />
          </div>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="imageUrl" className="form-label">URL de Imagen Principal</label>
            <input id="imageUrl" name="imageUrl" type="text" required className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl2" className="form-label">URL de Imagen Secundaria</label>
            <input id="imageUrl2" name="imageUrl2" type="text" className="form-input" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="videoUrl" className="form-label">URL del Video</label>
          <input id="videoUrl" name="videoUrl" type="text" className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="galleryImages" className="form-label">Galería de Imágenes (URLs separadas por comas)</label>
          <textarea id="galleryImages" name="galleryImages" className="form-textarea" placeholder="https://.../img1.jpg, https://.../img2.jpg" />
        </div>
        <div className="form-group">
            <label htmlFor="categorias" className="form-label">Categorías</label>
            <input id="categorias" name="categorias" type="text" className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="texto_oferta" className="form-label">Texto de Oferta</label>
          <input id="texto_oferta" name="texto_oferta" type="text" className="form-input" />
        </div>
        <fieldset className="form-fieldset">
          <legend className="form-label">Opciones</legend>
          <div className="form-checkbox-group">
            <input id="inStock" name="inStock" type="checkbox" defaultChecked />
            <label htmlFor="inStock">En Stock</label>
          </div>
        </fieldset>
        <div className="form-grid">
            <BooleanSelect name="es_mas_vendido" label="Es Más Vendido" />
            <BooleanSelect name="es_destacado" label="Es Destacado" />
            <BooleanSelect name="es_destacado_semana" label="Es Destacado (Semana)" />
            <BooleanSelect name="es_destacado_hogar" label="Es Destacado (Hogar)" />
        </div>
        <button type="submit" className="admin-submit-btn">Guardar Producto</button>
      </form>
    </div>
  );
}