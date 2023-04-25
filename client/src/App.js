// ======================== React Router
import { Route, Routes, useLocation } from "react-router-dom";

// ======================== Components
import Alert from "./components/alert/Alert";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import SuccessAlert from "./components/successAlert/SuccessAlert";

// ======================== Pages
import Create from "./pages/create/Create";
import Detail from "./pages/detail/Detail";
import Home from "./pages/home/Home";
import Landing from "./pages/landing/Landing";
import NotFound from "./pages/notFound/NotFound";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";

// ======================== Hooks
import { useEffect } from "react";

// ======================== React Redux
import { connect } from "react-redux";
import {
    getAllPokemons,
    getUserPokemonsByUserId,
    setLocation,
} from "../src/redux/actions";

// ======================== Consts
import { PAGES } from "./const";

function App(props) {
    const {
        globalError,
        globalSuccess,
        isLogin,
        userData,
        pokemons,
        userPokemons,
    } = props;

    const { getAllPokemons, getUserPokemonsByUserId, setLocation } = props;
    const location = useLocation().pathname;

    // ALERT & SUCCESS
    const locationAlerts = Boolean(
        location === "/home" ||
            location === "/detail/:id" ||
            location === "/create" ||
            location === "/signup" ||
            location === "/signin" ||
            (isLogin && location === `/${userData.username}`)
    );

    const showAlert = Boolean(globalError && locationAlerts);
    const showSuccessAlert = Boolean(
        globalSuccess && !globalError && locationAlerts
    );

    let alertClass = "";
    if (
        location === "/home" ||
        location === "/detail/:id" ||
        (isLogin && location === `/${userData.username}`)
    ) {
        alertClass = "marginImg";
    } else if (location === "/signin" || location === "/signup") {
        alertClass = "margin0";
    } else {
        alertClass = "margin5";
    }

    // HEADER
    const locationHeader = Boolean(
        location !== "/" && location !== "/signin" && location !== "/signup"
    );

    // Redux
    useEffect(() => {
        !pokemons.length && getAllPokemons();
        if (isLogin) {
            !userPokemons.length && getUserPokemonsByUserId(userData.id);
        }
    }, [isLogin]);
    useEffect(() => {
        if (location === "/home") setLocation(PAGES.HOME);
        if (location === `/${userData.username}`) setLocation(PAGES.FAVORITES);
    }, [location]);

    return (
        <>
            {locationHeader && <Header />}
            {showAlert && <Alert alertClass={alertClass} />}
            {showSuccessAlert && <SuccessAlert alertClass={alertClass} />}
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/create" element={<Create />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                {isLogin && (
                    <Route path={`/${userData.username}`} element={<Home />} />
                )}
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </>
    );
}
const mapStateToProps = (state) => {
    return {
        pokemons: state.pokemons,
        globalError: state.globalError,
        globalSuccess: state.globalSuccess,
        isLogin: state.isLogin,
        userData: state.userData,
        userPokemons: state.userPokemons,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllPokemons: () => dispatch(getAllPokemons()),
        getUserPokemonsByUserId: (userId) =>
            dispatch(getUserPokemonsByUserId(userId)),
        setLocation: (location) => dispatch(setLocation(location)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
