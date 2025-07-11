import React, { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle, Info } from 'lucide-react'

const GoogleOAuthStatus = () => {
  const [status, setStatus] = useState('checking')
  const [message, setMessage] = useState('')

  useEffect(() => {
    checkGoogleOAuthStatus()
  }, [])

  const checkGoogleOAuthStatus = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/google/status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        setStatus('configured')
        setMessage('Google OAuth está configurado correctamente')
      } else {
        setStatus('not-configured')
        setMessage('Google OAuth no está configurado. Revisa la documentación.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Error al verificar la configuración de Google OAuth')
    }
  }

  if (status === 'checking') {
    return (
      <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 border border-blue-200 rounded-md p-3">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        <span className="text-sm">Verificando configuración de Google OAuth...</span>
      </div>
    )
  }

  if (status === 'configured') {
    return (
      <div className="flex items-center space-x-2 text-green-600 bg-green-50 border border-green-200 rounded-md p-3">
        <CheckCircle className="h-4 w-4" />
        <span className="text-sm">{message}</span>
      </div>
    )
  }

  if (status === 'not-configured') {
    return (
      <div className="flex items-center space-x-2 text-yellow-600 bg-yellow-50 border border-yellow-200 rounded-md p-3">
        <AlertCircle className="h-4 w-4" />
        <span className="text-sm">{message}</span>
        <a 
          href="/GOOGLE_OAUTH_SETUP.md" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs underline hover:text-yellow-800"
        >
          Ver documentación
        </a>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2 text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
      <Info className="h-4 w-4" />
      <span className="text-sm">{message}</span>
    </div>
  )
}

export default GoogleOAuthStatus 