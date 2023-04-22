import axios, { all } from "axios";
import { BACKEND_BASE_URI } from "../../config";

// ======================== Styles
import styles from "./signup.module.css";
import logo from "../../assets/logo.png";

// ======================== Validators
import { validateSignUp } from "../../functions/validateSignUp";

// ======================== Hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ======================== React Router
import { Link } from "react-router-dom";

// ======================== Redux

const Signup = () => {
    // Show password
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Al users
    const [allUsers, setAllUsers] = useState([]);
    useEffect(async () => {
        if (!allUsers.length) {
            const response = await axios.get(`${BACKEND_BASE_URI}/users/all`);
            setAllUsers(response.data);
            console.log(allUsers);
        }
    }, []);

    // State form
    const [userData, setUserData] = useState({
        email: "",
        username: "",
        password: "",
        passwordConfirm: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        username: "",
        password: "",
    });

    const [buttonClicks, setButtonClicks] = useState(0);

    // Handlers
    const handleEmailChange = (event) => {
        setUserData({ ...userData, email: event.target.value });
        setErrors({
            ...errors,
            email: validateSignUp(
                { ...userData, email: event.target.value },
                allUsers
            ).email,
        });
    };

    const handleUsernameChange = (event) => {
        setUserData({ ...userData, username: event.target.value });
        setErrors({
            ...errors,
            username: validateSignUp(
                {
                    ...userData,
                    username: event.target.value,
                },
                allUsers
            ).username,
        });
    };

    const handlePasswordChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserData({ ...userData, [name]: value });
        setErrors({
            ...errors,
            password: validateSignUp(
                {
                    ...userData,
                    [name]: value,
                },
                allUsers
            ).password,
        });
    };

    const buttonDisabled =
        userData.email === "" ||
        Object.values(errors).some((error) => error !== "");

    const submitHandler = async (event) => {
        event.preventDefault();

        if (buttonClicks === 0) {
            const validateErrors = validateSignUp(userData, allUsers);
            const newErrors = {
                email: validateErrors.email,
                username: validateErrors.username,
                password: validateErrors.password,
            };
            setErrors(newErrors);
        } else {
            alert("CREATED");
        }
        setButtonClicks((prev) => prev + 1);
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1 className={styles.title}>
                    Sign up now and{" "}
                    <span className={styles.yellow}>Catch 'Em All!</span>
                </h1>
                <p className={styles.description}>
                    Don't miss the chance to be a part of the Pokemon world.
                </p>
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
                        <span className={styles.spanError}>{errors.email}</span>
                    </div>
                    <div className={styles.textInput}>
                        <label htmlFor="username">Username:</label>
                        <input
                            className={`${styles.input} ${
                                errors.username && styles.error
                            }`}
                            type="text"
                            id="username"
                            name="username"
                            placeholder="janedoe"
                            value={userData.username}
                            onChange={handleUsernameChange}
                        />
                        <span className={styles.spanError}>
                            {errors.username}
                        </span>
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
                        <div className={styles.spanErrorDiv}></div>
                        <span className={styles.spanError}>
                            {errors.password}
                        </span>
                    </div>
                    <div className={styles.textInput}>
                        <label htmlFor="password">Confirm password:</label>
                        <input
                            className={`${styles.input} ${
                                errors.password && styles.error
                            }`}
                            type={showPassword ? "text" : "password"}
                            id="passwordConfirm"
                            name="passwordConfirm"
                            value={userData.passwordConfirm}
                            onChange={handlePasswordChange}
                        />
                    </div>

                    <button
                        className={styles.buttonSubmit}
                        disabled={buttonDisabled}
                    >
                        Sign up
                    </button>
                </form>
                <p className={styles.infoAbove}>
                    Have an account? <Link to="/signin">Sign in!</Link>
                </p>
            </div>
            <div className={styles.imageContainer}>
                <img src={logo} alt="Pokemon App" />
                <p className={styles.infoAbove}>
                    Back <Link to="/signin">home.</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
