'use client';

import { useState } from 'react';
import { updateOrderStatus } from '@/app/admin/actions';

// Definimos un tipo para las órdenes
type Order = {
  id: number;
  created_at: string;
  customer_name: string;
  total_amount: number;
  status: string;
};

export default function OrdersTable({
  initialOrders,
}: {
  initialOrders: Order[];
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      alert('¡Estado de la orden actualizado!');
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      alert('No se pudo actualizar el estado de la orden.');
    }
  };

  const filteredOrders = initialOrders.filter((order) =>
    order.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por nombre de cliente..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '8px', marginBottom: '20px', width: '300px' }}
      />

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID Orden</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Fecha</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Cliente</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {order.id}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {new Date(order.created_at).toLocaleDateString()}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {order.customer_name}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                Gs. {order.total_amount.toLocaleString('es-PY')}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <select
                  defaultValue={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value)
                  }
                  style={{ padding: '5px' }}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Enviado">Enviado</option>
                  <option value="Entregado">Entregado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
