import { notFound } from 'next/navigation';
import { createAuthServerClient } from '@/lib/supabase/auth-server';
import { updateCaracteristica } from '@/app/admin/actions';
import Link from 'next/link';

async function getCaracteristica(id: string) {
  const supabase = await createAuthServerClient();
  const { data } = await supabase
    .from('caracteristicas')
    .select('*')
    .eq('id', id)
    .single();
  return data;
}

export default async function EditCaracteristicaPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const caracteristica = await getCaracteristica(resolvedParams.id);

  if (!caracteristica) notFound();

  // Mapeamos el nombre de la columna con espacios al producto_id para el formulario
  const productoIdValue = caracteristica["id del producto"];

  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxSizing: 'border-box' as const,
    color: '#000000',
    fontSize: '15px',
    fontWeight: '500',
    backgroundColor: '#ffffff',
    outline: 'none'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontSize: '13px',
    fontWeight: '700',
    color: '#1a1a1a'
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '700px', margin: '0 auto', fontFamily: 'sans-serif', minHeight: '90vh' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link href={`/admin/products/edit/${productoIdValue}`} style={{ color: '#A78D5A', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
          ← Volver al producto
        </Link>
      </div>

      <h1 style={{ marginBottom: '30px', fontSize: '22px', fontWeight: '700' }}>Editar Característica</h1>

      <form action={updateCaracteristica.bind(null, caracteristica.id)} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.06)', border: '1px solid #eee' }}>
        
        <input type="hidden" name="producto_id" value={productoIdValue} />

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Título</label>
          <input name="titulo" defaultValue={caracteristica.titulo} required style={inputStyle} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>URL Imagen</label>
          <input name="imagen" defaultValue={caracteristica.imagen || ''} style={inputStyle} placeholder="URL de la imagen o icono" />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Descripción</label>
          <textarea name="descripcion" defaultValue={caracteristica.descripcion} required style={{ ...inputStyle, height: '120px', fontFamily: 'inherit' }} />
        </div>

        <div style={{ marginBottom: '30px', width: '150px' }}>
          <label style={labelStyle}>Orden</label>
          <input name="orden" type="number" defaultValue={caracteristica.orden || 0} style={inputStyle} />
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <button type="submit" style={{ flex: 1, padding: '16px', backgroundColor: '#A78D5A', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', textTransform: 'uppercase' }}>
            GUARDAR CAMBIOS
          </button>
          
          <Link href={`/admin/products/edit/${productoIdValue}`} style={{ flex: 1, padding: '16px', backgroundColor: '#eee', color: '#333', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', textTransform: 'uppercase' }}>
            CANCELAR
          </Link>
        </div>
      </form>
    </div>
  );
}