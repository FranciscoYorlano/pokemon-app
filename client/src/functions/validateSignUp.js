const REGEX_USERNAME = /^[a-z0-9_]{3,20}$/;
const REGEX_EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const REGEX_PASSWORD = /^(?=.*\d)(?=.*[A-Z])(?!.*\s).{6,15}$/;

export const validateSignUp = (userData) => {
    const { email, username, password } = userData;

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
        }
    }

    if (!email) {
        errors.email = "Email is required.";
    } else {
        if (!REGEX_EMAIL.test(email)) {
            errors.email = "Email is invalid.";
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

    return errors;
};
