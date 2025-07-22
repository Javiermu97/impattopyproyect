'use client';

import { useState, useEffect } from 'react';
import { Product, ProductVariant } from '@/lib/data';

interface CheckoutFormProps {
  product: Product;
  selectedVariant: ProductVariant;
  onClose: () => void;
  onConfirm: (data: any) => void;
}

const paraguayLocations = {
  "Asunción": ["Asunción"],
  "Concepción": ["Concepción", "Horqueta", "Yby Yaú"],
  "San Pedro": ["San Pedro del Ycuamandiyú", "San Estanislao", "Guayaibí"],
  "Cordillera": ["Caacupé", "Tobatí", "Piribebuy"],
  "Guairá": ["Villarrica", "Independencia", "Mbocayaty"],
  "Caaguazú": ["Coronel Oviedo", "Caaguazú", "Yhú"],
  "Caazapá": ["Caazapá", "Yuty", "San Juan Nepomuceno"],
  "Itapúa": ["Encarnación", "Hohenau", "Capitán Miranda"],
  "Misiones": ["San Juan Bautista", "Ayolas", "Santa Rosa"],
  "Paraguarí": ["Paraguarí", "Yaguarón", "Carapeguá"],
  "Alto Paraná": ["Ciudad del Este", "Hernandarias", "Presidente Franco"],
  "Central": ["Areguá", "Capiatá", "Fernando de la Mora", "Itá", "Itauguá", "Lambaré", "Limpio", "Luque", "Mariano Roque Alonso", "Ñemby", "San Antonio", "San Lorenzo", "Villa Elisa", "Villeta"],
  "Ñeembucú": ["Pilar", "Humaitá", "Villa Oliva"],
  "Amambay": ["Pedro Juan Caballero", "Capitán Bado", "Bella Vista"],
  "Canindeyú": ["Salto del Guairá", "Curuguaty", "Katueté"],
  "Presidente Hayes": ["Villa Hayes", "Benjamín Aceval", "Pozo Colorado"],
  "Boquerón": ["Filadelfia", "Loma Plata", "Mariscal Estigarribia"],
  "Alto Paraguay": ["Fuerte Olimpo", "Bahía Negra", "Carmelo Peralta"]
};


export default function CheckoutForm({ product, selectedVariant, onClose, onConfirm }: CheckoutFormProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [formVariant, setFormVariant] = useState(selectedVariant);
  const [formData, setFormData] = useState({
    city: '',
    name: '',
    phone: '',
    address: '',
    ruc: '',
    email: ''
  });

  useEffect(() => {
    if (selectedDepartment && paraguayLocations[selectedDepartment as keyof typeof paraguayLocations]) {
      setCities(paraguayLocations[selectedDepartment as keyof typeof paraguayLocations]);
    } else {
      setCities([]);
    }
    setFormData(prev => ({ ...prev, city: '' }));
  }, [selectedDepartment]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newVariant = product.variants.find(v => v.color === e.target.value);
      if(newVariant) {
        setFormVariant(newVariant);
      }
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
  };

  const calculatePrice = (quantity: number) => {
    const basePrice = product.price;
    if (quantity === 1) return basePrice;
    
    let discount = 0;
    if (quantity === 2) discount = 0.15;
    if (quantity === 3) discount = 0.20;
    
    const totalPrice = (basePrice * quantity) * (1 - discount);
    return Math.round(totalPrice);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderDetails = {
        product,
        formVariant,
        selectedQuantity,
        totalPrice: calculatePrice(selectedQuantity),
        formData,
        department: selectedDepartment,
        orderId: Math.floor(40000 + Math.random() * 10000),
        orderDate: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }).replace('.', '')
    };
    onConfirm(orderDetails);
  };

  // SE RESTAURA TU FUNCIÓN 'renderForm' TAL CUAL LA TENÍAS
  const renderForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="checkout-product-options">
        {/* Opción 1 Unidad */}
        <label className={`quantity-option ${selectedQuantity === 1 ? 'selected' : ''}`}>
          <input type="radio" name="quantity" value={1} checked={selectedQuantity === 1} onChange={() => setSelectedQuantity(1)} />
          <div className="quantity-info">
            <span className="quantity-text">1 Unidad</span>
          </div>
          <div className="quantity-price">
            {product.oldPrice && <span className="original-price">Gs. {product.oldPrice.toLocaleString('es-PY')}</span>}
            <span className="final-price">Gs. {product.price.toLocaleString('es-PY')}</span>
          </div>
        </label>

        {/* Opciones 2 y 3 Unidades */}
        {[2, 3].map(q => {
          const originalTotal = product.price * q;
          const finalPrice = calculatePrice(q);
          const discountPercentage = q === 2 ? 15 : 20;

          return (
            <label key={q} className={`quantity-option ${selectedQuantity === q ? 'selected' : ''}`}>
              <input type="radio" name="quantity" value={q} checked={selectedQuantity === q} onChange={() => setSelectedQuantity(q)} />
              <div className="quantity-info">
                <span className="quantity-text">{q} Unidades</span>
                <span className="quantity-discount">Ahorra {discountPercentage}%</span>
              </div>
              <div className="quantity-price">
                <span className="original-price">Gs. {originalTotal.toLocaleString('es-PY')}</span>
                <span className="final-price">Gs. {finalPrice.toLocaleString('es-PY')}</span>
              </div>
            </label>
          )
        })}
      </div>
      
      {/* Selector de color unificado */}
      {product.variants.length > 1 && (
        <div className="checkout-color-selector">
            <label htmlFor="color-select-checkout" className="variant-label">Color:</label>
            <select id="color-select-checkout" value={formVariant.color} onChange={handleVariantChange} className="form-input">
                {product.variants.map(v => <option key={v.color} value={v.color}>{v.color}</option>)}
            </select>
        </div>
      )}

      <div className="checkout-summary">
        <div className="summary-row"><span>Subtotal</span> <span>Gs. {calculatePrice(selectedQuantity).toLocaleString('es-PY')}</span></div>
        <div className="summary-row"><span>Envío</span> <span>Gratis</span></div>
        <div className="summary-row total"><span>Total</span> <span>Gs. {calculatePrice(selectedQuantity).toLocaleString('es-PY')}</span></div>
        <p className="summary-note">Envíos y impuestos incluidos</p>
      </div>

      <div className="checkout-fields">
        <div className="form-group-inline">
          <input type="text" placeholder="Agregar código de descuento" className="form-input" />
          <button type="button" className="apply-btn">Aplicar</button>
        </div>
        <select value={selectedDepartment} onChange={handleDepartmentChange} className="form-input" required>
          <option value="">-Selecciona tu departamento aquí-</option>
          {Object.keys(paraguayLocations).map(dep => <option key={dep} value={dep}>{dep}</option>)}
        </select>
        <select name="city" value={formData.city} onChange={handleInputChange} className="form-input" required disabled={!selectedDepartment || cities.length === 0}>
          <option value="">-Agrega tu ciudad aquí-</option>
          {cities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
        
        <p className="shipping-options-title">Opciones de envío</p>
        <label className="shipping-option">
          <input type="radio" name="shipping" defaultChecked />
          <div>
            <p>Envíos standard (24-72hs) <span>Gratis</span></p>
            <small>Válido para todo el país.</small>
          </div>
        </label>
        <p className="shipping-note">-PEDIDOS REALIZADOS ANTES DE LAS 14:00H SE ENTREGAN EN EL MISMO DÍA- ¡Válido para Asunción y alrededores! <strong>Obs: Solo Días Útiles</strong></p>

        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Inserte su nombre y apellido aquí" className="form-input" required />
        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Inserte su número con whatsapp" className="form-input" required />
        <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Dirección" className="form-input" required />
        <input type="text" name="ruc" value={formData.ruc} onChange={handleInputChange} placeholder="Insertar CI o RUC para facturación" className="form-input" required />
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Correo electrónico" className="form-input" required />

        <label className="confirm-checkbox">
          <input type="checkbox" required />
          CONFIRMO QUE MIS DATOS ESTÁN CORRECTOS Y QUIERO COMPRAR EL PRODUCTO
        </label>
        <p className="attention-note"><strong>ATENCIÓN:</strong> Tu pedido únicamente podrá salir del depósito si tus datos están completos. Por favor, verifica que tu dirección esté correcta antes de continuar. Al finalizar el pedido estás aceptando nuestras políticas.</p>

        <button type="submit" className="submit-btn primary">PAGAR AL RECIBIR Gs. {calculatePrice(selectedQuantity).toLocaleString('es-PY')}</button>
        <small className="payment-note">Efectivo y transferencia bancaria. (Sólo para Asunción y alrededores)</small>
        <button type="submit" className="submit-btn secondary">PAGAR CON TARJETA Gs. {calculatePrice(selectedQuantity).toLocaleString('es-PY')}</button>
      </div>
    </form>
  );

  // SE RESTAURA TU 'return' ORIGINAL
  return (
    <div className="checkout-modal-overlay">
      <div className="checkout-modal-content">
        <button onClick={onClose} className="close-btn">&times;</button>
        <h2>REALIZAR PEDIDO</h2>
        {renderForm()}
      </div>
    </div>
  );
}