'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function SalesChart({ data }: { data: any[] }) {
  const formatCurrency = (value: number) => `Gs. ${value.toLocaleString('es-PY')}`;
  const colors = ['#A78D5A', '#C5A368', '#8E774A', '#D4AF37', '#B8860B'];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: 40, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis 
          dataKey="month" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 11, fill: '#999' }}
          padding={{ left: 20, right: 20 }} // Esto acerca la barra al centro/inicio
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 11, fill: '#999' }}
          tickFormatter={(value) => value > 0 ? `${value / 1000}k` : '0'} // Simplifica para que no ocupe tanto espacio
        />
        <Tooltip 
          cursor={{ fill: '#f9f9f9' }}
          formatter={(value) => [formatCurrency(Number(value)), "Ventas"]}
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
        />
        <Bar dataKey="total" radius={[4, 4, 0, 0]} barSize={50}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}