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
      // Abrir ventana popup para autenticación con Google
      const popup = window.open(
        'http://localhost:3000/auth/google',
        'googleAuth',
        'width=500,height=600,scrollbars=yes,resizable=yes'
      )

      return new Promise((resolve, reject) => {
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed)
            reject(new Error('Autenticación cancelada'))
          }
        }, 1000)

        // Escuchar mensajes del popup
        const handleMessage = (event) => {
          if (event.origin !== 'http://localhost:3000') return

          if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
            clearInterval(checkClosed)
            popup.close()
            window.removeEventListener('message', handleMessage)

            const { token, usuario } = event.data
            setUser(usuario)
            setToken(token)
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(usuario))

            resolve({ success: true })
          } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
            clearInterval(checkClosed)
            popup.close()
            window.removeEventListener('message', handleMessage)
            reject(new Error(event.data.error || 'Error en autenticación con Google'))
          }
        }

        window.addEventListener('message', handleMessage)
      })
    } catch (error) {
      console.error('Error en login con Google:', error)
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