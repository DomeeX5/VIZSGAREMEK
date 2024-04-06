import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {AuthProvider} from "./Components/Login/AuthContextProvider.tsx";
import {CartProvider} from "./Components/Cart/CartContext.tsx";
import {AddToCartProvider} from "./Components/AddCart.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <CartProvider>
                <AddToCartProvider>
                        <App />
                </AddToCartProvider>
            </CartProvider>
        </AuthProvider>
    </React.StrictMode>

)
