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
          <label htmlFor="name" className="form-label">name:</label>
          <input id="name" name="name" type="text" required className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">description:</label>
          <textarea id="description" name="description" className="form-textarea" />
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="price" className="form-label">price:</label>
            <input id="price" name="price" type="number" required className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="oldPrice" className="form-label">oldPrice:</label>
            <input id="oldPrice" name="oldPrice" type="number" className="form-input" />
          </div>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="ImageUrl" className="form-label">ImageUrl:</label>
            <input id="ImageUrl" name="ImageUrl" type="text" className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="ImageUrl2" className="form-label">ImageUrl2:</label>
            <input id="ImageUrl2" name="ImageUrl2" type="text" className="form-input" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="videoUrl" className="form-label">videoUrl:</label>
          <input id="videoUrl" name="videoUrl" type="text" className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="galleryImages" className="form-label">galleryImages (URLs separadas por comas):</label>
          <textarea id="galleryImages" name="galleryImages" className="form-textarea" />
        </div>
        <div className="form-group">
            <label htmlFor="categoria" className="form-label">categoria:</label>
            <input id="categoria" name="categoria" type="text" className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="texto_oferta" className="form-label">texto_oferta:</label>
          <input id="texto_oferta" name="texto_oferta" type="text" className="form-input" />
        </div>
        <fieldset className="form-fieldset">
          <legend className="form-label">Opciones</legend>
          <div className="form-checkbox-group">
            <input id="inStock" name="inStock" type="checkbox" defaultChecked />
            <label htmlFor="inStock">inStock</label>
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