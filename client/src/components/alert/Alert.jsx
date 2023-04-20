// ======================== Styles
import styles from "./alert.module.css";

// ======================== Hooks
import { connect } from "react-redux";
import { removeGlobalError } from "../../redux/actions";

const Alert = (props) => {
    const { globalError, removeGlobalError } = props;

    const handleCloseAlert = () => {
        removeGlobalError();
    };

    return (
        <div className={styles.alertWrapper}>
            <div className={styles.alertContainer}>
                <button
                    type="button"
                    className={styles.closeButton}
                    onClick={handleCloseAlert}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
                <p>{globalError}</p>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        globalError: state.globalError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeGlobalError: () => dispatch(removeGlobalError()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
