import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Register from "./Register/Register.tsx";
import Main from "./Main_page/Main.tsx";
import Login from "./Login/login.tsx";
import Products from "./Product_page/product.tsx";
import Cart from "./Cart/Cart.tsx";
import Purchase from "./Purchase/Purchase.tsx";
import Navbars from "./Components/Navbar.tsx";
import Footer from "./Components/Footer.tsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Navbars/>
            <Routes>
                <Route path={"/"} element={<Main/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={`/products/:id`} element={<Products/>}/>
                <Route path={"/cart"} element={<Cart/>}/>
                <Route path={"/purchase"} element={<Purchase/>}/>
                <Route path={"*"} element={<Navigate to={"/"} />}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    </>
  )
}

export default App
