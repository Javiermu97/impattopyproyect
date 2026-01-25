'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function SalesChart({ data }: { data: any[] }) {
  const formatCurrency = (value: number) => `Gs. ${value.toLocaleString('es-PY')}`;
  const colors = ['#A78D5A', '#C5A368', '#8E774A', '#D4AF37', '#B8860B'];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 20, left: 30, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
        <XAxis 
          dataKey="month" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 11, fill: '#666' }}
          dy={10}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 11, fill: '#666' }}
          tickFormatter={(value) => value.toLocaleString('es-PY')}
          width={90} // Espacio extra para que no se corte el monto en Gs.
        />
        <Tooltip 
          formatter={(value) => [formatCurrency(Number(value)), "Ventas Totales"]}
          contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
        />
        <Bar dataKey="total" radius={[6, 6, 0, 0]} barSize={40}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}