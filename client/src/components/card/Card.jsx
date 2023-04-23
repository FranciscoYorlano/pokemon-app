// ======================== Styles
import styles from "./card.module.css";

// ======================== React Router
import { Link } from "react-router-dom";

const Card = (props) => {
    const { id, name, image, attack, life, types } = props.pokemon;

    const nameU = name[0].toUpperCase() + name.substring(1);

    return (
        <div className={styles.card}>
            <Link to={`/detail/${id}`}>
                <div className={styles.cardImage}>
                    <img src={image} alt={name} />
                </div>
                <h2 className={styles.cardName}>{nameU}</h2>
                <div className={styles.cardTypes}>
                    {types.map((type) => (
                        <span
                            key={type}
                            className={`${styles.type} ${styles[`${type}`]}`}
                        >
                            {type}
                        </span>
                    ))}
                </div>
                <div className={styles.cardStats}>
                    <span className={styles.stat}>
                        <svg
                            width="2rem"
                            height="2rem"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="SVGRepo_bgCarrier" stroke-width="0" />

                            <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />

                            <g id="SVGRepo_iconCarrier">
                                {" "}
                                <g id="Warning / Shield_Warning">
                                    {" "}
                                    <path
                                        id="Vector"
                                        d="M12 8V12M20 10.165C20 16.7333 15.0319 19.6781 12.9258 20.6314L12.9231 20.6325C12.7016 20.7328 12.5906 20.7831 12.3389 20.8263C12.1795 20.8537 11.8215 20.8537 11.6621 20.8263C11.4094 20.7829 11.2972 20.7325 11.074 20.6314C8.9678 19.6781 4 16.7333 4 10.165V6.2002C4 5.08009 4 4.51962 4.21799 4.0918C4.40973 3.71547 4.71547 3.40973 5.0918 3.21799C5.51962 3 6.08009 3 7.2002 3H16.8002C17.9203 3 18.4796 3 18.9074 3.21799C19.2837 3.40973 19.5905 3.71547 19.7822 4.0918C20 4.5192 20 5.07899 20 6.19691V10.165ZM12.0498 15V15.1L11.9502 15.1002V15H12.0498Z"
                                        stroke="#FFFFFF"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />{" "}
                                </g>{" "}
                            </g>
                        </svg>
                        {attack}
                    </span>
                    <span className={styles.stat}>
                        <svg
                            width="2rem"
                            height="2rem"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="SVGRepo_bgCarrier" stroke-width="0" />

                            <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />

                            <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path
                                    d="M20.4037 12.5C20.778 11.6322 21 10.7013 21 9.71405C21 6 18.9648 4 16.4543 4C15.2487 4 14.0925 4.49666 13.24 5.38071L12.7198 5.92016C12.3266 6.32798 11.6734 6.32798 11.2802 5.92016L10.76 5.38071C9.90749 4.49666 8.75128 4 7.54569 4C5 4 3 6 3 9.71405C3 10.7013 3.222 11.6322 3.59627 12.5M20.4037 12.5C18.395 17.1578 12 20 12 20C12 20 5.60502 17.1578 3.59627 12.5M20.4037 12.5L16.3249 12.5C16.1273 12.5 15.9483 12.3837 15.868 12.2031L14.4483 9.00872C14.2737 8.61588 13.7176 8.61194 13.5374 9.00226L11.436 13.5555C11.2603 13.9361 10.7223 13.9445 10.5348 13.5695L9.44721 11.3944C9.26295 11.0259 8.73705 11.0259 8.55279 11.3944L8.1382 12.2236C8.0535 12.393 7.88037 12.5 7.69098 12.5L3.59627 12.5"
                                    stroke="#FFFFFF"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />{" "}
                            </g>
                        </svg>
                        {life}
                    </span>
                </div>
            </Link>
        </div>
    );
};

export default Card;
