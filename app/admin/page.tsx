'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import OrdersTable from './OrdersTable'

type Order = {
  id: number
  created_at: string
  customer_name: string
  total_amount: number
  status: string
}

export default function AdminDashboard() {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSessionAndLoad = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.replace('/admin/login')
        return
      }

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setOrders(data as Order[])
      }

      setLoading(false)
    }

    checkSessionAndLoad()
  }, [router, supabase])

  if (loading) {
    return <p style={{ padding: 20 }}>Cargando panel…</p>
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Panel de Administración</h1>
      <h2>Historial de Pedidos</h2>
      <OrdersTable initialOrders={orders} />
    </div>
  )
}




