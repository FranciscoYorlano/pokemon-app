// ======================== Styles
import styles from "./landing.module.css";
import pikachu from "../../assets/pikachu.png";

// ======================== React Router
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div className={styles.landingContainer}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>Catch 'Em All!</h1>
                <p className={styles.description}>
                    Explore our collection of Pokemon and find your favorites.
                </p>
                <Link to="/home">
                    <button className={styles.button}>Explore</button>
                </Link>
            </div>
            <div className={styles.imageContainer}>
                <Link to="/home">
                    <img src={pikachu} alt="Pokemon App" />
                </Link>
            </div>
        </div>
    );
};

export default Landing;
