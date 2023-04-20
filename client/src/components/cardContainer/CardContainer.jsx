import styles from "./cardContainer.module.css";

import Card from "../../components/card/Card";

const CardContainer = ({ paginatedPokemons }) => {
    return (
        <div className={styles.cardsContainer}>
            {paginatedPokemons.map((pokemon) => (
                <div key={pokemon.id}>
                    <Card pokemon={pokemon} />
                </div>
            ))}
        </div>
    );
};

export default CardContainer;
