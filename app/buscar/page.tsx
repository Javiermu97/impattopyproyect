// app/buscar/page.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient'; // Usamos tu cliente de Supabase
import { Product } from '@/lib/types'; // Usamos tu tipo de Producto

// Envolvemos el componente principal en Suspense para que useSearchParams funcione
function SearchResultsPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query) {
        setProducts([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      
      // Buscamos en la base de datos de Supabase
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .ilike('name', `%${query}%`); // 'ilike' es case-insensitive

      if (error) {
        console.error('Error al buscar productos:', error);
      } else {
        setProducts(data || []);
      }
      
      setIsLoading(false);
    };

    fetchProducts();
  }, [query]);

  return (
    // Usamos el 'shop-container' de tu globals.css para centrar
    <div className="shop-container" style={{ minHeight: '60vh' }}>
      {isLoading ? (
        <h2 className="section-title">Buscando...</h2>
      ) : (
        <>
          <h2 className="section-title">
            {products.length > 0
              ? `Resultados para: "${query}"`
              : `No se encontraron resultados para: "${query}"`}
          </h2>
          
          {products.length > 0 && (
            // Reutilizamos los estilos de tu grilla de productos
            <div className="product-grid-shop columns-4">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} className="shop-product-card-link">
                  <div className="shop-product-card">
                    <div className="image-container">
                      {product.oldPrice && <span className="shop-offer-badge">Oferta</span>}
                      <Image 
                        src={product.imageUrl} 
                        alt={product.name} 
                        fill 
                        className="shop-product-image-primary"
                        style={{ objectFit: 'cover' }}
                      />
                      {product.imageUrl2 && (
                        <Image 
                          src={product.imageUrl2} 
                          alt={product.name} 
                          fill 
                          className="shop-product-image-secondary"
                          style={{ objectFit: 'cover' }}
                        />
                      )}
                    </div>
                    <h4>{product.name}</h4>
                    <div className="price-section">
                      <span className="shop-product-price">Gs. {product.price.toLocaleString('es-PY')}</span>
                      {product.oldPrice && <span className="shop-product-old-price">Gs. {product.oldPrice.toLocaleString('es-PY')}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Exportamos el componente envuelto en Suspense
export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="shop-container" style={{ minHeight: '60vh' }}><h2 className="section-title">Cargando...</h2></div>}>
      <SearchResultsPageContent />
    </Suspense>
  );
}