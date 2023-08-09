import { CartProvider } from '@/components/CartContext'
import { ProductProvider } from '@/components/ProductContext'
import { LoginProvider } from '@/components/LoginContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <LoginProvider>
      <CartProvider>
        <ProductProvider> {/* Wrap the Descricao component here */}
          <Component {...pageProps} />
        </ProductProvider>
      </CartProvider>
    </LoginProvider>
  )
}
