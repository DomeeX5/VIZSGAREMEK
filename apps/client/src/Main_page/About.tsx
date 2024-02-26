import Navbar from "../Main_elements/Navbar.tsx";
import Footer from "../Main_elements/Footer.tsx";
import "./mainDesign.css"
import {Link} from "react-router-dom";
import {FormEvent, useState} from "react";

function About(){

    const [product,setProduct]=useState('')
    //const [selected,setSelected]=useState('')
    //const [selectedType,setSelectedType]=useState('')
    const [_,setErrors]=useState<string[]>()

    function getProduct(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        fetch('/api/product',{
            method:"POST",
            body: JSON.stringify({product}),
            headers:{
                'Content-type':'application/json'
            }
        })
            .then(async (res)=>{
                if(!res.ok){
                    return setErrors(await res.json().then(err=>err.message))
                } else {
                    return res.json();
                }
            })
    }

    const sel = Array.from({ length: 16 }, (_, i) => i + 1);

    return(
        <>
        <div>
            {Navbar()}
            <form onSubmit={getProduct}>
            <div className={"container"}>
                <div className={"row"}>
                    {sel.slice(0, 16).map((itemIndex) => (
                        <div key={itemIndex} className={"col-xl-3 col-lg-4 col-md-6 col-12"}>
                            <div className="card kartya">
                                <img src={product} className="card-img-top" alt="gojo"/>
                                <div className="card-body">
                                    <h5 className="card-title">{product.description}</h5>
                                    <p className="card-text">{product}</p>
                                    <Link to={`/product/${product.id}`} className="btn btn-primary">Áru megtekintése</Link>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            </form>
            {Footer()}
        </div>
        </>
    )
}

export default About;