import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Register from "./Register/Register.tsx";
import About from "./Register/About.tsx";
import Login from "./Login/login.tsx";
import LoginSucces from "./Login/Login-succes.tsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<About />}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/login-succes"} element={<LoginSucces/>}/>
                <Route path={"*"} element={<Navigate to={"/"} />}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
