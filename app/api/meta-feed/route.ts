import { getProducts } from '@/lib/database';
import { Product } from '@/lib/types';

export async function GET() {
  const products = await getProducts();

  const items = products.map((p: Product) => {
    const price = `${p.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} PYG`;
    const oldPrice = p.oldPrice
      ? `${p.oldPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })} PYG`
      : null;

    return `
    <item>
      <g:id>${p.id}</g:id>
      <g:title><![CDATA[${p.name}]]></g:title>
      <g:description><![CDATA[${p.description || p.name}]]></g:description>
      <g:link>https://impatto.com.py/products/${p.id}</g:link>
      <g:image_link>${p.imageUrl}</g:image_link>
      <g:availability>${p.inStock === false ? 'out of stock' : 'in stock'}</g:availability>
      <g:price>${price}</g:price>
      ${oldPrice ? `<g:sale_price>${price}</g:sale_price>` : ''}
      ${oldPrice ? `<g:original_price>${oldPrice}</g:original_price>` : ''}
      <g:condition>new</g:condition>
      <g:brand>Impatto Py</g:brand>
    </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Impatto Py</title>
    <link>https://impatto.com.py</link>
    <description>Catálogo de productos Impatto Py</description>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}