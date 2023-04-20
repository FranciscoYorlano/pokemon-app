// ======================== Styles
import styles from "./notFound.module.css";
import logo from "../../assets/logo.png";

// ======================== React Router
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div className={styles.notFoundContainer}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>
                    Sorry, this page isn't available.
                </h1>
                <p className={styles.description}>
                    The link you followed may be broken, or the page may have
                    been removed. Go back to <Link to="/home">Home</Link>
                </p>
                <Link to="/home">
                    <button className={styles.button}>Home</button>
                </Link>
            </div>
            <div className={styles.imageContainer}>
                <Link to="/home">
                    <img src={logo} alt="Pokemon App" />
                </Link>
            </div>
        </div>
    );
};

export default Landing;
