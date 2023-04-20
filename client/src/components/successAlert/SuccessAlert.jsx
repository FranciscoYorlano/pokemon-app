// ======================== Styles
import styles from "./successAlert.module.css";

// ======================== Hooks
import { connect } from "react-redux";
import { removeGlobalSuccess } from "../../redux/actions";

const SuccessAlert = (props) => {
    const { globalSuccess, removeGlobalSuccess } = props;

    const handleCloseAlert = () => {
        removeGlobalSuccess();
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
