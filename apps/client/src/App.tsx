import {useEffect, useState} from 'react'
import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Register from "./Register/Register.tsx";
import About from "./Register/About.tsx";

function App() {
  const [_, setGreeting] = useState('');

    useEffect(() => {
        fetch('/api')
            .then((res) => res.text())
            .then(setGreeting)
    })
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
