import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Register from "./Components/Register/Register.tsx";
import Main from "./Components/Home/Main.tsx";
import Login from "./Components/Login/login.tsx";
import Products from "./Components/Product/product.tsx";
import Cart from "./Components/Cart/Cart.tsx";
import Purchase from "./Components/Purchase/Purchase.tsx";
import Navbars from "./Components/Navbar.tsx";
import Footer from "./Components/Footer.tsx";
import {useState} from "react";

function App() {

    const [currentPage, setCurrentPage] = useState<number>(1);

    return (
        <>
            <BrowserRouter>
                <Navbars currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <Routes>
                <Route path="/" element={<Main currentPage={currentPage} setCurrentPage={setCurrentPage} />} />
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
