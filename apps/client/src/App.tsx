import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Register from "./Register/Register.tsx";
import About from "./Main_page/About.tsx";
import Login from "./Login/login.tsx";
import LoginSuccess from "./Login/Login-success.tsx";
import Product from "./Product_page/product.tsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<About />}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/product"} element={<Product/>}/>
                <Route path={"/login-success"} element={<LoginSuccess/>}/>
                <Route path={"*"} element={<Navigate to={"/"} />}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
