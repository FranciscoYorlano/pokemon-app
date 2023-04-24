import styles from "./cardContainer.module.css";

import Card from "../../components/card/Card";

const CardContainer = ({ paginatedPokemons, userPokemons }) => {
    const pokemonsToRender = paginatedPokemons.map((pokemon) => ({
        ...pokemon,
        isFav: userPokemons.map((fav) => fav.PokemonId).includes(pokemon.id),
    }));
    return (
        <div className={styles.cardsContainer}>
            {pokemonsToRender.map((pokemon) => (
                <div key={pokemon.id}>
                    <Card pokemon={pokemon} />
                </div>
            ))}
        </div>
    );
};

export default CardContainer;
