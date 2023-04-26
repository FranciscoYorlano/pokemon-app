// ======================== Styles
import styles from "./header.module.css";
import logo from "../../assets/logo.png";

// ======================== React Router
import { Link } from "react-router-dom";

// ======================== Hooks
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// ======================== React Redux
import { connect } from "react-redux";
import {
    getPokemonsByName,
    resetPokemons,
    signout,
    setLocation,
} from "../../redux/actions";

// ======================== Consts
import { USER } from "../../const";
import { PAGES } from "../../const";

const Header = (props) => {
    const {
        getPokemonsByName,
        resetPokemons,
        isLogin,
        userData,
        signout,
        setLocation,
    } = props;

    // Dropdown
    const location = useLocation().pathname;
    const [showDropdown, setShowDropdown] = useState(false);

    const handleShowDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    useEffect(() => {
        setShowDropdown(false);
    }, [location]);

    // Search bar
    const [name, setName] = useState("");

    const handleInputChange = (event) => {
        setName(event.target.value);
    };

    const navigate = useNavigate();
    const handleSearchsubmit = (event) => {
        event.preventDefault();
        navigate("/home");
        if (name === "") {
            setLocation(PAGES.HOME);
            resetPokemons();
        } else {
            setLocation(PAGES.SEARCH);
            getPokemonsByName(name);
        }
    };

    // Button sign in /out
    const handleButtonClick = (event) => {
        if (event.target.id === USER.SIGN_IN) navigate("/signin");

        if (event.target.id === USER.SIGN_OUT) signout();
    };

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Link to="/">
                    <img
                        src={logo}
                        alt="Pokemon App"
                        className={styles.logoImage}
                    />
                </Link>
            </div>

            <div className={styles.center}>
                <form className={styles.search} onSubmit={handleSearchsubmit}>
                    <input
                        type="text"
                        placeholder="Search pokemon"
                        className={styles.inputSearch}
                        name="search"
                        value={name}
                        onChange={handleInputChange}
                    />
                </form>
            </div>

            <div className={styles.right}>
                <Link to="/home">Home</Link>
                <Link to="/create">Create</Link>
                <div className={styles.yLine}></div>
                {isLogin && <Link to={`/${userData.username}`}>Favorites</Link>}
                {isLogin ? (
                    <button
                        id={USER.SIGN_OUT}
                        className={styles.buttonDanger}
                        onClick={handleButtonClick}
                    >
                        Sign out
                    </button>
                ) : (
                    <button
                        id={USER.SIGN_IN}
                        className={styles.buttonPrimary}
                        onClick={handleButtonClick}
                    >
                        Sign in
                    </button>
                )}
                <div className={styles.yLine}></div>
                <Link
                    to="https://www.linkedin.com/in/francisco-yorlano/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <svg
                        width="2.5rem"
                        height="2.5rem"
                        viewBox="-2.4 -2.4 28.80 28.80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#000000"
                        stroke-width="0.00024000000000000003"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0" />

                        <g
                            id="SVGRepo_tracerCarrier"
                            srokeLinecap="round"
                            SrokeLinejoin="round"
                            stroke="#CCCCCC"
                            stroke-width="0.144"
                        />

                        <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                                d="M22 3.47059V20.5294C22 20.9194 21.8451 21.2935 21.5693 21.5693C21.2935 21.8451 20.9194 22 20.5294 22H3.47059C3.08056 22 2.70651 21.8451 2.43073 21.5693C2.15494 21.2935 2 20.9194 2 20.5294V3.47059C2 3.08056 2.15494 2.70651 2.43073 2.43073C2.70651 2.15494 3.08056 2 3.47059 2H20.5294C20.9194 2 21.2935 2.15494 21.5693 2.43073C21.8451 2.70651 22 3.08056 22 3.47059ZM7.88235 9.64706H4.94118V19.0588H7.88235V9.64706ZM8.14706 6.41177C8.14861 6.18929 8.10632 5.96869 8.02261 5.76255C7.93891 5.55642 7.81542 5.36879 7.65919 5.21039C7.50297 5.05198 7.31708 4.92589 7.11213 4.83933C6.90718 4.75277 6.68718 4.70742 6.46471 4.70588H6.41177C5.95934 4.70588 5.52544 4.88561 5.20552 5.20552C4.88561 5.52544 4.70588 5.95934 4.70588 6.41177C4.70588 6.86419 4.88561 7.29809 5.20552 7.61801C5.52544 7.93792 5.95934 8.11765 6.41177 8.11765C6.63426 8.12312 6.85565 8.0847 7.06328 8.00458C7.27092 7.92447 7.46074 7.80422 7.62189 7.65072C7.78304 7.49722 7.91237 7.31346 8.00248 7.10996C8.09259 6.90646 8.14172 6.6872 8.14706 6.46471V6.41177ZM19.0588 13.3412C19.0588 10.5118 17.2588 9.41177 15.4706 9.41177C14.8851 9.38245 14.3021 9.50715 13.7799 9.77345C13.2576 10.0397 12.8143 10.4383 12.4941 10.9294H12.4118V9.64706H9.64706V19.0588H12.5882V14.0529C12.5457 13.5403 12.7072 13.0315 13.0376 12.6372C13.3681 12.2429 13.8407 11.9949 14.3529 11.9471H14.4647C15.4 11.9471 16.0941 12.5353 16.0941 14.0176V19.0588H19.0353L19.0588 13.3412Z"
                                fill="#006571"
                            />{" "}
                        </g>
                    </svg>
                </Link>
                <Link
                    to="https://github.com/FranciscoYorlano/PI-Pokemon-v2.0"
                    target="_blank"
                    rel="noreferrer"
                >
                    <svg
                        width="2rem"
                        height="2rem"
                        viewBox="0 0 20 20"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0" />

                        <g
                            id="SVGRepo_tracerCarrier"
                            srokeLinecap="round"
                            SrokeLinejoin="round"
                        />

                        <g id="SVGRepo_iconCarrier">
                            {" "}
                            <g
                                id="Page-1"
                                stroke="none"
                                stroke-width="1"
                                fill="none"
                                fllRule="evenodd"
                            >
                                {" "}
                                <g
                                    id="Dribbble-Light-Preview"
                                    transform="translate(-140.000000, -7559.000000)"
                                    fill="#006571"
                                >
                                    {" "}
                                    <g
                                        id="icons"
                                        transform="translate(56.000000, 160.000000)"
                                    >
                                        {" "}
                                        <path
                                            d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                                            id="github-[#006571]"
                                            fill="#006571"
                                        >
                                            {" "}
                                        </path>{" "}
                                    </g>{" "}
                                </g>{" "}
                            </g>{" "}
                        </g>
                    </svg>
                </Link>
            </div>
            <div className={styles.responsiveMenu}>
                <div className={styles.dropdown}>
                    <button
                        onClick={handleShowDropdown}
                        className={styles.dropdownBtn}
                    >
                        .
                        <svg
                            fill="#ffffff"
                            width="2rem"
                            height="2rem"
                            viewBox="0 0 32 32"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="SVGRepo_bgCarrier" stroke-width="0" />

                            <g
                                id="SVGRepo_tracerCarrier"
                                srokeLinecap="round"
                                SrokeLinejoin="round"
                            />

                            <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path d="M0.844 6.050c-0.256-0.256-0.381-0.581-0.381-0.975s0.125-0.719 0.381-0.975 0.581-0.381 0.975-0.381h28.512c0.394 0 0.719 0.125 0.975 0.381s0.381 0.581 0.381 0.975-0.125 0.719-0.381 0.975-0.581 0.381-0.975 0.381h-28.512c-0.394 0-0.719-0.125-0.975-0.381zM31.306 14.963c0.256 0.256 0.381 0.581 0.381 0.975s-0.125 0.719-0.381 0.975-0.581 0.381-0.975 0.381h-28.512c-0.394 0-0.719-0.125-0.975-0.381s-0.381-0.581-0.381-0.975 0.125-0.719 0.381-0.975 0.581-0.381 0.975-0.381h28.512c0.394 0 0.719 0.125 0.975 0.381zM31.306 25.819c0.256 0.256 0.381 0.581 0.381 0.975s-0.125 0.719-0.381 0.975-0.581 0.381-0.975 0.381h-28.512c-0.394 0-0.719-0.125-0.975-0.381s-0.381-0.581-0.381-0.975 0.125-0.719 0.381-0.975 0.581-0.381 0.975-0.381h28.512c0.394 0 0.719 0.131 0.975 0.381z" />{" "}
                            </g>
                        </svg>
                    </button>
                    <div
                        className={`${styles.dropdownContent} ${
                            showDropdown && styles.show
                        }`}
                    >
                        <div className={styles.dropdownOptionFirst}>
                            <Link className={styles.link} to="/home">
                                Home
                            </Link>
                        </div>
                        <div className={styles.xLine}></div>
                        <div className={styles.dropdownOption}>
                            <Link className={styles.link} to="/create">
                                Create
                            </Link>
                        </div>
                        {isLogin && (
                            <>
                                <div className={styles.xLine}></div>
                                <div className={styles.dropdownOption}>
                                    <Link
                                        className={styles.link}
                                        to={`/${userData.username}`}
                                    >
                                        Favorites
                                    </Link>
                                </div>
                            </>
                        )}
                        <div className={styles.xLine}></div>
                        <div className={styles.dropdownOptionLast}>
                            {isLogin ? (
                                <button
                                    id={USER.SIGN_OUT}
                                    className={styles.buttonDanger}
                                    onClick={handleButtonClick}
                                >
                                    Sign out
                                </button>
                            ) : (
                                <button
                                    id={USER.SIGN_IN}
                                    className={styles.buttonPrimary}
                                    onClick={handleButtonClick}
                                >
                                    Sign in
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLogin: state.isLogin,
        userData: state.userData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPokemonsByName: (name) => dispatch(getPokemonsByName(name)),
        resetPokemons: () => dispatch(resetPokemons()),
        signout: () => dispatch(signout()),
        setLocation: (location) => dispatch(setLocation(location)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
