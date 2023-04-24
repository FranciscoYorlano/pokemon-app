// ======================== Styles
import styles from "./signin.module.css";
import welcome from "../../assets/welcome-back.png";

// ======================== Hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ======================== React Router
import { Link } from "react-router-dom";

// ======================== Redux
import { connect } from "react-redux";
import { validateUser, removeUserError } from "../../redux/actions";

const Signin = (props) => {
    const { validateUser, signInError, isLogin, removeUserError } = props;
    const navigate = useNavigate();

    // Show password
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // State form
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    useEffect(() => {
        return setUserData({ email: "", password: "" });
    }, []);

    // Handlers
    const handleEmailChange = (event) => {
        signInError && removeUserError();
        setUserData({ ...userData, email: event.target.value });
        !{ ...userData, email: event.target.value }.email
            ? setErrors({ ...errors, email: true })
            : setErrors({ ...errors, email: false });
    };

    const handlePasswordChange = (event) => {
        signInError && removeUserError();
        setUserData({ ...userData, password: event.target.value });
        !{ ...userData, password: event.target.value }.password
            ? setErrors({ ...errors, password: true })
            : setErrors({ ...errors, password: false });
    };

    const buttonDisabled = errors.email || errors.password;

    useEffect(() => {
        isLogin && navigate("/home");
    }, [isLogin]);

    const submitHandler = async (event) => {
        event.preventDefault();
        validateUser(userData);
        setUserData({ ...userData, password: "" });
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1 className={styles.title}>
                    Good to see you again!
                    <span className={styles.yellow}></span>
                </h1>
                <p className={styles.description}>Please sign in.</p>
                <form onSubmit={submitHandler} className={styles.form}>
                    <div className={styles.textInput}>
                        <label htmlFor="name">Email:</label>
                        <input
                            className={`${styles.input} ${
                                errors.email && styles.error
                            }`}
                            type="text"
                            id="email"
                            name="email"
                            placeholder="example@gmail.com"
                            value={userData.email}
                            onChange={handleEmailChange}
                            autoFocus
                        />
                    </div>

                    <div className={styles.textInput}>
                        <label htmlFor="password">Password:</label>
                        <div className={styles.passwordDiv}>
                            <input
                                className={`${styles.input} ${
                                    errors.password && styles.error
                                }`}
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="At least 6 characters"
                                value={userData.password}
                                onChange={handlePasswordChange}
                            />
                            <button
                                type="button"
                                className={styles.showPasswordButton}
                                onClick={handleShowPassword}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        <span className={styles.spanError}>{signInError}</span>
                    </div>

                    <button
                        className={styles.buttonSubmit}
                        disabled={buttonDisabled}
                    >
                        Sign in
                    </button>
                </form>
                <p className={styles.infoAbove}>
                    Don't have an account? <Link to="/signup">Sign up!</Link>
                </p>
                <p className={styles.infoAbove}>
                    Back <Link to="/home">home.</Link>
                </p>
            </div>
            <div className={styles.imageContainer}>
                <img src={welcome} alt="Pokemon App" />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        signInError: state.signInError,
        isLogin: state.isLogin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        validateUser: (userData) => dispatch(validateUser(userData)),
        removeUserError: () => dispatch(removeUserError()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
