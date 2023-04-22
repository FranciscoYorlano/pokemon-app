const REGEX_USERNAME = /^[a-z0-9_]{3,20}$/;
const REGEX_EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const REGEX_PASSWORD = /^(?=.*\d)(?=.*[A-Z])(?!.*\s).{6,15}$/;

export const validateSignUp = (userData, users) => {
    const { email, username, password, passwordConfirm } = userData;

    const errors = {
        email: "",
        username: "",
        password: "",
    };

    if (!username) {
        errors.username = "Username is required";
    } else {
        if (!REGEX_USERNAME.test(username)) {
            errors.username =
                "Username must be between 3 and 20 characters long, and can only contain lowercase letters, numbers and underscores.";
        } else {
            if (users.some((user) => user.username === username)) {
                errors.username = "Username is already in use.";
            }
        }
    }

    if (!email) {
        errors.email = "Email is required.";
    } else {
        if (!REGEX_EMAIL.test(email)) {
            errors.email = "Email is invalid.";
        } else {
            if (users.some((user) => user.email === email)) {
                errors.email = "Email is already in use.";
            }
        }
    }

    if (!password) {
        errors.password = "Password is required.";
    } else {
        if (!REGEX_PASSWORD.test(password)) {
            errors.password =
                "Password must be between 6 and 15 characters long, and contain at least one uppercase letter, one number, and no spaces.";
        }
    }

    if ((passwordConfirm || password) && !errors.password) {
        if (password !== passwordConfirm) {
            errors.password = "Passwords do not match";
        }
    }

    return errors;
};
