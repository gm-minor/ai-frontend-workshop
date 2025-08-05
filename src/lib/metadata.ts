import { Metadata } from 'next'

export const siteMetadata: Metadata = {
  title: {
    template: '%s | Exclusive',
    default: 'Exclusive - Your One-Stop Shop'
  },
  description: 'Find the best products at amazing prices. Shop electronics, fashion, and more.',
  keywords: ['e-commerce', 'shopping', 'electronics', 'fashion', 'deals'],
  authors: [{ name: 'Exclusive Team' }],
  creator: 'Exclusive',
  publisher: 'Exclusive',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://exclusive-shop.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://exclusive-shop.com',
    title: 'Exclusive - Your One-Stop Shop',
    description: 'Find the best products at amazing prices. Shop electronics, fashion, and more.',
    siteName: 'Exclusive',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exclusive - Your One-Stop Shop',
    description: 'Find the best products at amazing prices. Shop electronics, fashion, and more.',
    creator: '@exclusive',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export function generateProductMetadata(product: {
  name: string
  description: string
  image: string
  id: string
}): Metadata {
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  }
}
