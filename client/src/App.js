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

// ======================== React Redux
import { connect } from "react-redux";

function App(props) {
    const { globalError, globalSuccess } = props;

    const location = useLocation().pathname;

    const locationAlerts = Boolean(
        location === "/home" ||
            location === "/detail/:id" ||
            location === "/create"
    );

    const showAlert = Boolean(globalError && locationAlerts);
    const showSuccessAlert = Boolean(
        globalSuccess && !globalError && locationAlerts
    );

    return (
        <>
            {useLocation().pathname !== "/" && <Header />}
            {showAlert && <Alert />}
            {showSuccessAlert && <SuccessAlert />}
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/create" element={<Create />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </>
    );
}
const mapStateToProps = (state) => {
    return {
        globalError: state.globalError,
        globalSuccess: state.globalSuccess,
    };
};

export default connect(mapStateToProps, null)(App);
