import styles from "./pagination.module.css";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    return (
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
    );
};

export default Pagination;
