'use client';

import Script from 'next/script';

export default function TidioChat() {
  return (
    <Script
      src="//code.tidio.co/gfajtvx0ehynbkw18db5wvto7n3adn4r.js"
      strategy="afterInteractive"
    />
  );
}