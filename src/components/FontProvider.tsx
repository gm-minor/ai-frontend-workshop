'use client'

import { useEffect, useState } from 'react'

interface FontProviderProps {
  children: React.ReactNode
  fontVariables: string
}

export default function FontProvider({ children, fontVariables }: FontProviderProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // On server, render without font variables to prevent hydration mismatch
  // On client, apply font variables after hydration
  return (
    <div className={`min-h-screen ${isClient ? fontVariables : 'antialiased'}`}>
      {children}
    </div>
  )
}
