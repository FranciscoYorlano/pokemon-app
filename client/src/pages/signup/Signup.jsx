// ======================== Styles
import styles from "./signup.module.css";
import logo from "../../assets/logo.png";

// ======================== React Router
import { Link } from "react-router-dom";

// ======================== Hooks
import { useState } from "react";

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
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
                <form onSubmit={() => {}} className={styles.form}>
                    <div className={styles.textInput}>
                        <label htmlFor="name">Email:</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="email"
                            name="email"
                            placeholder="example@gmail.com"
                            onChange={() => {}}
                            autoFocus
                        />
                        <span className={styles.spanError}>{}</span>
                    </div>
                    <div className={styles.textInput}>
                        <label htmlFor="username">Username:</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="username"
                            name="username"
                            placeholder="janedoe"
                            onChange={() => {}}
                        />
                        <span className={styles.spanError}>{}</span>
                    </div>
                    <div className={styles.textInput}>
                        <label htmlFor="password">Password:</label>
                        <div className={styles.passwordDiv}>
                            <input
                                className={styles.input}
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="At least 6 characters"
                                onChange={() => {}}
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
                            Password must be between 6 and 15 characters long,
                            and contain at least one uppercase letter, one
                            number, and no spaces.
                        </span>
                    </div>
                    <div className={styles.textInput}>
                        <label htmlFor="password">Confirm password:</label>
                        <input
                            className={styles.input}
                            type={showPassword ? "text" : "password"}
                            id="passwordConfirm"
                            name="passwordConfirm"
                            onChange={() => {}}
                        />
                    </div>

                    <button className={styles.buttonSubmit}>Sign up</button>
                </form>
            </div>
            <div className={styles.imageContainer}>
                <img src={logo} alt="Pokemon App" />
            </div>
        </div>
    );
};

export default Signup;
