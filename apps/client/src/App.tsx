import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Register from "./Register/Register.tsx";
import Main from "./Main_page/Main.tsx";
import Login from "./Login/login.tsx";
import LoginSuccess from "./Login/Login-success.tsx";
import Products from "./Product_page/product.tsx";
import Cart from "./Cart/Cart.tsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Main />}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={`/products`} element={<Products/>}/>
                <Route path={"/login-success"} element={<LoginSuccess/>}/>
                <Route path={"/cart"} element={<Cart/>}/>
                <Route path={"*"} element={<Navigate to={"/"} />}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
