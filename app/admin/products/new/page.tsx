import { createProduct } from '../../actions';

// Componente para los menús desplegables de opciones Booleanas/Nulas
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
          <label htmlFor="nombre" className="form-label">nombre:</label>
          <input id="nombre" name="nombre" type="text" required className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion" className="form-label">descripción:</label>
          <textarea id="descripcion" name="descripcion" className="form-textarea" />
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="precio" className="form-label">precio:</label>
            <input id="precio" name="precio" type="number" required className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="precio_antiguo" className="form-label">precio_antiguo:</label>
            <input id="precio_antiguo" name="precio_antiguo" type="number" className="form-input" />
          </div>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="imageUrl" className="form-label">URL de la imagen:</label>
            <input id="imageUrl" name="imageUrl" type="text" required className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl2" className="form-label">URL de la imagen2:</label>
            <input id="imageUrl2" name="imageUrl2" type="text" className="form-input" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="videoUrl" className="form-label">URL del vídeo</label>
          <input id="videoUrl" name="videoUrl" type="text" className="form-input" placeholder="NULO" />
        </div>
        <div className="form-group">
          <label htmlFor="galleryImages" className="form-label">Galería de imágenes:</label>
          <textarea id="galleryImages" name="galleryImages" className="form-textarea" placeholder="NULO" />
        </div>
        <div className="form-grid">
            <div className="form-group">
                <label htmlFor="categorias" className="form-label">categorías:</label>
                <input id="categorias" name="categorias" type="text" className="form-input" />
            </div>
            
        </div>
        <div className="form-group">
          <label htmlFor="texto_oferta" className="form-label">texto_oferta:</label>
          <input id="texto_oferta" name="texto_oferta" type="text" className="form-input" />
        </div>
        <fieldset className="form-fieldset">
          <legend className="form-label">Opciones</legend>
          <div className="form-checkbox-group">
            <input id="inStock" name="inStock" type="checkbox" defaultChecked />
            <label htmlFor="inStock">en stock</label>
          </div>
        </fieldset>
        <div className="form-grid">
            <BooleanSelect name="es_mas_vendido" label="es_mas_vendido" />
           
            <BooleanSelect name="es_destacado_semana" label="es_destacado_semana" />
            <BooleanSelect name="es_destacado_hogar" label="es_destacado_hogar" />
        </div>
        <button type="submit" className="admin-submit-btn">Guardar Producto</button>
      </form>
    </div>
  );
}