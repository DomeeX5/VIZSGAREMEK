import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {AuthProvider} from "./Components/Login/AuthContextProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
)
