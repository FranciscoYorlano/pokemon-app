// ======================== Styles
import styles from "./header.module.css";
import logo from "../../assets/logo.png";

// ======================== React Router
import { Link } from "react-router-dom";

// ======================== Hooks
import { useState } from "react";

// ======================== React Redux
import { useDispatch } from "react-redux";
import { getPokemonsByName, removePokemons } from "../../redux/actions";

const Header = () => {
    const [name, setName] = useState("");

    const handleInputChange = (event) => {
        setName(event.target.value);
    };

    const dispatch = useDispatch();
    const handleSearchsubmit = (event) => {
        event.preventDefault();
        if (name !== "") {
            dispatch(getPokemonsByName(name));
        } else {
            dispatch(removePokemons());
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Link to="/">
                    <img
                        src={logo}
                        alt="Pokemon App"
                        className={styles.landingImg}
                    />
                </Link>
                <Link to="/home">
                    <img
                        src={logo}
                        alt="Pokemon App"
                        className={styles.homeImg}
                    />
                </Link>
            </div>
            <div className={styles.navLinks}>
                <Link to="/home" className={styles.linkHome}>
                    Home
                </Link>
                <Link to="/create">Create</Link>
            </div>

            <form className={styles.search} onSubmit={handleSearchsubmit}>
                <input
                    type="text"
                    placeholder="Search"
                    className={styles.input}
                    name="search"
                    value={name}
                    onChange={handleInputChange}
                />
                <button type="submit" className={styles.button}>
                    Search
                </button>
            </form>
        </div>
    );
};

export default Header;
