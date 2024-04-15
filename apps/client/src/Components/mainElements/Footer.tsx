import './Style/App.css'
import {useAuth} from "../Login/AuthContextProvider.tsx";

/**
 * Footer component displaying a quote and applying a dark overlay if the logout panel is shown.
 * @returns JSX.Element
 */
function Footer(): JSX.Element {
    /**
     * Accesses the authentication context to determine whether the logout panel is shown.
     */
    const { showLogoutPanel } = useAuth();

    return (
        <footer className={`footer ${showLogoutPanel ? 'darken' : ''}`}>
            <div className="footer-content">
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>We are dedicated to providing you with the best experience possible. Our mission is to...</p>
                </div>
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p>Address: 123 Street, City, Country</p>
                    <p>Email: contact@example.com</p>
                    <p>Phone: +123 456 7890</p>
                </div>
            </div>
            <div className="copyright">
                <p>"As time passes, our memories become richer. Perhaps the best moments are when we reminisce about the past and a smile forms on our lips. So, don't let moments slip away; cherish them in your heart. Always remember that happiness is not just a destination but also a part of the journey. Dream big, and walk the path boldly, for every step can be an adventure. Thank you for being with us, and remember: life is about adventures!"</p>
                <p>&copy; 2024 Your Company. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;