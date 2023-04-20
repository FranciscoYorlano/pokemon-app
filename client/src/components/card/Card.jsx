// ======================== Styles
import styles from "./card.module.css";

// ======================== React Router
import { Link } from "react-router-dom";

const Card = (props) => {
    const { id, name, image, types } = props.pokemon;

    const nameU = name[0].toUpperCase() + name.substring(1);

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <Link to={`/detail/${id}`}>
                    <img src={image} alt={name} className={styles.image} />
                </Link>
                <div className={styles.types}>
                    {types.map((type) => (
                        <span
                            key={type}
                            className={`${styles.type} ${styles[`${type}`]}`}
                        >
                            {type}
                        </span>
                    ))}
                </div>
            </div>
            <div className={styles.info}>
                <h2 className={styles.name}>{nameU}</h2>
            </div>
        </div>
    );
};

export default Card;
