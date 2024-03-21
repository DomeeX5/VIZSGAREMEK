import {ChangeEvent, useState} from "react";
import { Link } from "react-router-dom";
import {Order} from "@prisma/client";

function Purchase() {

    const [order,setOrder]=useState<Order[]>()
    const [address, setAddress] = useState({
        country: "",
        state: "",
        city: "",
        street: "",
        house_number: ""
    });
    const [_, setErrors] = useState<string[]>([]);
    console.log(order)
    function createOrder() {
        fetch('/order/new?userid=1', {
            method: 'POST',
            body: JSON.stringify({ payment: 1, address }),
            headers: {
                'Content-type': 'application/json'
            }
        }).then(async (res) => {
            if (!res.ok) {
                const error = await res.json();
                setErrors([error.message]);
            } else {
                const data = await res.json();
                setOrder(data);
            }
        });
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <div>
                <label>Ország</label><br />
                <input
                    type="text"
                    name="country"
                    value={address.country}
                    onChange={handleInputChange} /><br />
                <label>Megye</label><br />
                <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleInputChange} /><br />
                <label>Város</label><br />
                <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleInputChange} /><br />
                <label>Utca</label><br />
                <input
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={handleInputChange} /><br />
                <label>Házszám</label><br />
                <input
                    type="text"
                    name="house_number"
                    value={address.house_number}
                    onChange={handleInputChange} /><br />
                <p></p>
                <input
                    type="button"
                    value={'Vásárlás'}
                    onClick={createOrder} /><br />
                <Link to={'/cart'}>
                    <button>
                        Vissza a kosárhoz
                    </button>
                </Link>
            </div>
        </>
    );
}

export default Purchase;
