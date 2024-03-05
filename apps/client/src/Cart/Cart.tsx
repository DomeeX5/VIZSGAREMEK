import {useState} from "react";
import {jwtDecode} from "jwt-decode";
import {CartItem, Product} from "@prisma/client";

function Cart(){

    const [getProduct,setGetProduct]=useState<Product[]>()
    const [getCart,setGetCart]=useState<CartItem[]>()
    const [_, setErrors] = useState<string[]>([]);

    function GetCart(){
        const accessToken = sessionStorage.getItem("token");
        if (!accessToken) {
            console.log("Nincs accessToken a localStorage-ban");
            return;
        }
        const decodedToken = jwtDecode(accessToken);
        fetch(`/api/cart/items/${decodedToken.sub}`,{
            headers:{
                'Content-type':'application/json',
                'Authorization':`Bearer ${accessToken}`
            }
        }).then(async (res) =>{
            if(!res.ok){
                const error=await res.json()
                setErrors([error.message])
            } else {
                const data=await res.json();
                setGetCart(data)
            }
        })
    }

    return(
        <>
            <div>
                <form onLoad={GetCart}>
                    <div>
                        <ul>
                            {getCart && getCart.map((item) => (
                                <li key={item.}>
                                    {item.Product_product_id} - ${item.Product_product_id}  ${item.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Cart;