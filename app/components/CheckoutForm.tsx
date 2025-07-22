'use client';

import { useState, useEffect } from 'react';
import { Product, ProductVariant } from '@/lib/data';

/* ---------- Tipos ---------- */
interface OrderData {
  product: Product;
  formVariant: ProductVariant;
  selectedQuantity: number;
  totalPrice: number;
  formData: {
    city: string;
    name: string;
    phone: string;
    address: string;
    ruc: string;
    email: string;
  };
  department: string;
  orderId: number;
  orderDate: string;
}

interface CheckoutFormProps {
  product: Product;
  selectedVariant: ProductVariant;
  onClose: () => void;
  onConfirm: (data: OrderData) => void;
}

/* ---------- Lista de departamentos y ciudades ---------- */
const paraguayLocations = {
  Asunción: ['Asunción'],
  Concepción: ['Concepción', 'Horqueta', 'Yby Yaú'],
  'San Pedro': ['San Pedro del Ycuamandiyú', 'San Estanislao', 'Guayaibí'],
  Cordillera: ['Caacupé', 'Tobatí', 'Piribebuy'],
  Guairá: ['Villarrica', 'Independencia', 'Mbocayaty'],
  Caaguazú: ['Coronel Oviedo', 'Caaguazú', 'Yhú'],
  Caazapá: ['Caazapá', 'Yuty', 'San Juan Nepomuceno'],
  Itapúa: ['Encarnación', 'Hohenau', 'Capitán Miranda'],
  Misiones: ['San Juan Bautista', 'Ayolas', 'Santa Rosa'],
  Paraguarí: ['Paraguarí', 'Yaguarón', 'Carapeguá'],
  'Alto Paraná': ['Ciudad del Este', 'Hernandarias', 'Presidente Franco'],
  Central: [
    'Areguá',
    'Capiatá',
    'Fernando de la Mora',
    'Itá',
    'Itauguá',
    'Lambaré',
    'Limpio',
    'Luque',
    'Mariano Roque Alonso',
    'Ñemby',
    'San Antonio',
    'San Lorenzo',
    'Villa Elisa',
    'Villeta',
  ],
  Ñeembucú: ['Pilar', 'Humaitá', 'Villa Oliva'],
  Amambay: ['Pedro Juan Caballero', 'Capitán Bado', 'Bella Vista'],
  Canindeyú: ['Salto del Guairá', 'Curuguaty', 'Katueté'],
  'Presidente Hayes': ['Villa Hayes', 'Benjamín Aceval', 'Pozo Colorado'],
  Boquerón: ['Filadelfia', 'Loma Plata', 'Mariscal Estigarribia'],
  'Alto Paraguay': ['Fuerte Olimpo', 'Bahía Negra', 'Carmelo Peralta'],
} as const;

/* ---------- Componente ---------- */
export default function CheckoutForm({
  product,
  selectedVariant,
  onClose,
  onConfirm,
}: CheckoutFormProps) {
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
    email: '',
  });

  /* ---------- Actualiza ciudades según departamento ---------- */
  useEffect(() => {
    if (
      selectedDepartment &&
      paraguayLocations[selectedDepartment as keyof typeof paraguayLocations]
    ) {
      /* Clonamos el arreglo readonly → string[] mutables */
      setCities([
        ...paraguayLocations[
          selectedDepartment as keyof typeof paraguayLocations
        ],
      ]);
    } else {
      setCities([]);
    }
    setFormData((prev) => ({ ...prev, city: '' }));
  }, [selectedDepartment]);

  /* ---------- Handlers ---------- */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData((p) => ({ ...p, phone: value.replace(/\D/g, '') }));
    } else setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVar = product.variants.find((v) => v.color === e.target.value);
    if (newVar) setFormVariant(newVar);
  };

  const calculatePrice = (q: number) => {
    const d = q === 2 ? 0.15 : q === 3 ? 0.2 : 0;
    return Math.round(product.price * q * (1 - d));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      product,
      formVariant,
      selectedQuantity,
      totalPrice: calculatePrice(selectedQuantity),
      formData,
      department: selectedDepartment,
      orderId: Math.floor(40000 + Math.random() * 10000),
      orderDate: new Date()
        .toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
        .replace('.', ''),
    });
  };

  /* ---------- JSX (sin cambios visuales) ---------- */
  const renderForm = () => (
    <form onSubmit={handleSubmit}>
      {/* … Todo tu JSX original aquí, sin modificar … */}
    </form>
  );

  return (
    <div className="checkout-modal-overlay">
      <div className="checkout-modal-content">
        <button onClick={onClose} className="close-btn">
          &times;
        </button>
        <h2>REALIZAR PEDIDO</h2>
        {renderForm()}
      </div>
    </div>
  );
}


