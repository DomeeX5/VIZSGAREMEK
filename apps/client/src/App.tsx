import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Register from "./Components/Register/Register";
import Main from "./Components/Home/Main";
import Login from "./Components/Login/login";
import Products from "./Components/Product/product";
import Cart from "./Components/Cart/Cart";
import Purchase from "./Components/Purchase/Purchase";
import Navbar from "./Components/mainElements/Navbar";
import Footer from "./Components/mainElements/Footer";
import UserSettings from "./Components/Settings/UserSettings";
import 'bootstrap/dist/css/bootstrap.css'
import {useState} from "react";


/**
 * Represents the main application component.
 */
function App() {

    const [isUserSettingsPage, setIsUserSettingsPage] = useState(false);

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
                    <Route path="/settings" element={<UserSettings setIsUserSettingsPage={setIsUserSettingsPage} />} />
                    <Route path={"*"} element={<Navigate to={"/"} />}/>
                </Routes>
                {!isUserSettingsPage && <Footer />}
            </BrowserRouter>
        </>
  )
}

export default App
