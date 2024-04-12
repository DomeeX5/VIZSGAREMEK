import './Style/App.css'
import {useAuth} from "../Login/AuthContextProvider.tsx";

function Footer(){
    const {showLogoutPanel} = useAuth()

    return(
        <>
          <footer className={`footer sticky-bottom ${showLogoutPanel ? 'darken' : ''}`}>
              <div>
                  <p>"Ahogy az idő múlik, emlékeink egyre gazdagabbá válnak. Talán a legjobb pillanatok azok, amikor elmerengünk a múltban, és mosolyra húzódik az ajkunk. Így hát ne hagyd, hogy a pillanatok elveszzenek, hanem őrizd meg őket a szívedben. Mindig emlékezz arra, hogy a boldogság nem csupán egy célt jelent, hanem az utazás része is. Legyenek álmaid nagyok, és járd meg bátran az utat, hiszen minden lépés egy kaland lehet. Köszönjük, hogy velünk tartottál, és ne feledd: az élet a kalandokról szól!"</p>
              </div>
          </footer>
        </>
    )
}

export default Footer;