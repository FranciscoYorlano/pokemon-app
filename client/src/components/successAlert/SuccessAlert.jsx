// ======================== Styles
import styles from "./successAlert.module.css";

// ======================== Hooks
import { useEffect } from "react";

// ======================== Redux
import { connect } from "react-redux";
import { removeGlobalSuccess } from "../../redux/actions";

const SuccessAlert = (props) => {
    const { globalSuccess, removeGlobalSuccess, alertClass } = props;

    useEffect(() => {
        const timer = setTimeout(() => {
            removeGlobalSuccess();
        }, 5000);
        return () => clearTimeout(timer);
    }, [globalSuccess, removeGlobalSuccess]);

    const handleCloseAlert = () => {
        removeGlobalSuccess();
    };

    return (
        <div className={`${styles[alertClass]}`}>
            <div className={styles.alertContainer}>
                <button
                    type="button"
                    className={styles.closeButton}
                    onClick={handleCloseAlert}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
                <p>{globalSuccess}</p>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        globalSuccess: state.globalSuccess,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeGlobalSuccess: () => dispatch(removeGlobalSuccess()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SuccessAlert);
