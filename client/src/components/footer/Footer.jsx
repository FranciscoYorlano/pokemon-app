// ======================== Styles
import styles from "./footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.left}>
                2023 by
                <span>
                    <a
                        href="https://github.com/FranciscoYorlano"
                        target="_blank"
                    >
                        Francisco Yorlano
                    </a>
                </span>
            </div>
            <div className={styles.right}>
                <a
                    href="https://github.com/FranciscoYorlano/pokemon-pi"
                    target="_blank"
                >
                    GitHub
                </a>
                <a
                    href="https://www.linkedin.com/in/francisco-yorlano/"
                    target="_blank"
                >
                    LinkedIn
                </a>
            </div>
        </footer>
    );
};

export default Footer;
