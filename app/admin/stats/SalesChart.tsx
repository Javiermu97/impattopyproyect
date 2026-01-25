// app/admin/stats/SalesChart.tsx
'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function SalesChart({ data }: { data: any[] }) {
  const formatCurrency = (value: number) => `Gs. ${value.toLocaleString('es-PY')}`;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
        <XAxis dataKey="month" axisLine={false} tickLine={false} />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tickFormatter={(value) => value.toLocaleString('es-PY')} 
        />
        <Tooltip 
          formatter={(value) => [formatCurrency(Number(value)), "Ventas"]}
          contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        />
        <Bar dataKey="total" fill="#A78D5A" radius={[6, 6, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#000' : '#A78D5A'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}