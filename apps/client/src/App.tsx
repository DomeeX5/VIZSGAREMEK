import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Register from "./Components/Register/Register.tsx";
import Main from "./Components/Home/Main.tsx";
import Login from "./Components/Login/login.tsx";
import Products from "./Components/Product/product.tsx";
import Cart from "./Components/Cart/Cart.tsx";
import Purchase from "./Components/Purchase/Purchase.tsx";
import Navbar from "./Components/Navbar.tsx";
import Footer from "./Components/Footer.tsx";
import UserSettings from "./Components/Settings/UserSettings.tsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Main/>} />
                    <Route path={"/register"} element={<Register/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={`/products/:id`} element={<Products/>}/>
                    <Route path={"/cart"} element={<Cart/>}/>
                    <Route path={"/purchase"} element={<Purchase/>}/>
                    <Route path={"/settings/:option"} element={<UserSettings/>}/>
                    <Route path={"*"} element={<Navigate to={"/"} />}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
    </>
  )
}

export default App
