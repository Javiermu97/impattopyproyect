'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type SalesData = {
  month: string;
  total: number;
};

export default function SalesChart({ data }: { data: SalesData[] }) {
  // Formateador para moneda local
  const formatCurrency = (value: number) => `Gs. ${value.toLocaleString('es-PY')}`;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
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
          tickFormatter={(value) => `Gs. ${Number(value).toLocaleString('es-PY', { notation: 'compact' })}`} 
        />
        <Tooltip 
          cursor={{ fill: '#f9f9f9' }}
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          formatter={(value) => [formatCurrency(Number(value)), "Ingresos Total"]} 
        />
        <Legend wrapperStyle={{ paddingTop: '20px' }} />
        <Bar 
          dataKey="total" 
          fill="#A78D5A" 
          name="Ventas Totales" 
          radius={[4, 4, 0, 0]} 
          barSize={50}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}