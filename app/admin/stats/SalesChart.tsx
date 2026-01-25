'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function SalesChart({ data }: { data: any[] }) {
  const formatCurrency = (value: number) => `Gs. ${value.toLocaleString('es-PY')}`;

  // Paleta de colores profesionales para cada mes
  const colors = ['#A78D5A', '#C5A368', '#8E774A', '#D4AF37', '#B8860B'];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 60, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
        <XAxis 
          dataKey="month" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 12, fill: '#666' }} 
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 12, fill: '#666' }}
          tickFormatter={(value) => value.toLocaleString('es-PY')} 
        />
        <Tooltip 
          formatter={(value) => [formatCurrency(Number(value)), "Ventas Totales"]}
          contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
        />
        {/* barSize="40" hace que la barra sea más delgada y elegante */}
        <Bar dataKey="total" radius={[6, 6, 0, 0]} barSize={40}>
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              // Asigna un color diferente de la lista basado en el índice
              fill={colors[index % colors.length]} 
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}