// Styles
import styles from "./pagination.module.css";

// Redux
import { connect } from "react-redux";
import { setCurrentPage } from "../../redux/actions";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    const handlePageChange = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    return (
        <div className={styles.pagesWrapper}>
            <div className={styles.pagesContainer}>
                <button
                    id={currentPage - 1}
                    onClick={handlePageChange}
                    disabled={currentPage === 1}
                    className={styles.button}
                >
                    Prev
                </button>
                {currentPage === totalPages && totalPages > 3 && (
                    <button
                        id={currentPage - 2}
                        onClick={handlePageChange}
                        className={styles.button}
                    >
                        {currentPage - 2}
                    </button>
                )}
                {currentPage > 1 && (
                    <button
                        id={currentPage - 1}
                        onClick={handlePageChange}
                        className={styles.button}
                    >
                        {currentPage - 1}
                    </button>
                )}
                <button
                    id={currentPage}
                    onClick={handlePageChange}
                    className={styles.buttonSelected}
                >
                    {currentPage}
                </button>
                {currentPage < totalPages && (
                    <button
                        id={currentPage + 1}
                        onClick={handlePageChange}
                        className={styles.button}
                    >
                        {currentPage + 1}
                    </button>
                )}
                {currentPage === 1 && totalPages > 3 && (
                    <button
                        id={currentPage + 2}
                        onClick={handlePageChange}
                        className={styles.button}
                    >
                        {currentPage + 2}
                    </button>
                )}
                <button
                    id={currentPage + 1}
                    onClick={handlePageChange}
                    disabled={currentPage === totalPages}
                    className={styles.button}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currentPage: state.currentPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentPage: (page) => dispatch(setCurrentPage(page)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
