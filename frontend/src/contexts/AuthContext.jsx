import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))

  // Verificar token al cargar la aplicación
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')
      
      if (storedToken && storedUser) {
        try {
          setToken(storedToken)
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error('Error al cargar datos de autenticación:', error)
          logout()
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: email,
          clave: password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error en el inicio de sesión')
      }

      setUser(data.usuario)
      setToken(data.token)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.usuario))

      return { success: true }
    } catch (error) {
      console.error('Error en login:', error)
      return { success: false, error: error.message }
    }
  }

  const loginWithGoogle = async () => {
    try {
      const popup = window.open(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/google`,
        'googleAuth',
        'width=500,height=600,scrollbars=yes,resizable=yes'
      )

      if (!popup) {
        throw new Error('No se pudo abrir la ventana de autenticación. Verifica que el bloqueador de popups esté deshabilitado.')
      }

      return new Promise((resolve, reject) => {
        let isResolved = false
        
        const handleMessage = (event) => {
          if (!event.data || event.data.type !== 'GOOGLE_AUTH_SUCCESS') {
            return
          }

          if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
            isResolved = true
            popup.close()
            window.removeEventListener('message', handleMessage)
            clearInterval(storageCheckInterval)

            const { token, usuario } = event.data
            setUser(usuario)
            setToken(token)
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(usuario))

            resolve({ success: true })
          } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
            isResolved = true
            popup.close()
            window.removeEventListener('message', handleMessage)
            clearInterval(storageCheckInterval)
            reject(new Error(event.data.error || 'Error en autenticación con Google'))
          }
        }

        window.addEventListener('message', handleMessage)
        
        const checkCookies = () => {
          const cookies = document.cookie.split(';');
          let result = null;
          
          for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'googleAuthResult') {
              result = decodeURIComponent(value);
              break;
            }
          }
          
          if (result) {
            try {
              const data = JSON.parse(result)
              
              if (data.type === 'GOOGLE_AUTH_SUCCESS') {
                isResolved = true
                popup.close()
                window.removeEventListener('message', handleMessage)
                clearInterval(storageCheckInterval)
                
                const { token, usuario } = data
                setUser(usuario)
                setToken(token)
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(usuario))
                
                document.cookie = 'googleAuthResult=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                
                resolve({ success: true })
              }
            } catch (error) {
              console.error('Error al procesar datos de cookies:', error)
            }
          }
        }
        
        const storageCheckInterval = setInterval(checkCookies, 500)
        
        setTimeout(() => {
          if (!isResolved) {
            isResolved = true
            popup.close()
            window.removeEventListener('message', handleMessage)
            clearInterval(storageCheckInterval)
            reject(new Error('Timeout: La autenticación tardó demasiado'))
          }
        }, 120000)
      })
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (userData) => {
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: userData.email,
          nombre: userData.name,
          clave: userData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error en el registro')
      }

      return { success: true, user: data.usuario }
    } catch (error) {
      console.error('Error en register:', error)
      return { success: false, error: error.message }
    }
  }

  const registerWithGoogle = async () => {
    // Para Google, el registro es el mismo que el login ya que Google maneja la verificación
    return await loginWithGoogle()
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const isAuthenticated = () => {
    return !!token && !!user
  }

  const value = {
    user,
    token,
    loading,
    login,
    loginWithGoogle,
    register,
    registerWithGoogle,
    logout,
    isAuthenticated,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 