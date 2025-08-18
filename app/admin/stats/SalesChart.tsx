'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// El tipo de dato que esperamos de nuestra función RPC
type SalesData = {
  month: string;
  total: number;
};

export default function SalesChart({ data }: { data: SalesData[] }) {
  // Formateamos el total para que se vea bien en el tooltip del gráfico
  const formatCurrency = (value: number) => `Gs. ${value.toLocaleString('es-PY')}`;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => `Gs. ${Number(value).toLocaleString('es-PY', { notation: 'compact' })}`} />
        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
        <Legend />
        <Bar dataKey="total" fill="#8884d8" name="Ventas Totales" />
      </BarChart>
    </ResponsiveContainer>
  );
}