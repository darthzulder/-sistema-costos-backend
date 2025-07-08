import React from 'react'
import { Chrome } from 'lucide-react'

const GoogleButton = ({ 
  onClick, 
  loading = false, 
  text = "Continuar con Google",
  className = "",
  disabled = false 
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        w-full flex items-center justify-center px-4 py-3 border border-gray-300 
        rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 
        hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200 ease-in-out
        ${className}
      `}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700"></div>
      ) : (
        <>
          <Chrome className="h-5 w-5 mr-3 text-red-500" />
          {text}
        </>
      )}
    </button>
  )
}

export default GoogleButton 