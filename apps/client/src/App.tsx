import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Register from "./Register/Register.tsx";
import About from "./Register/About.tsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<About />}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"*"} element={<Navigate to={"/"} />}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
