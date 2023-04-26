// ======================== Styles
import styles from "./detail.module.css";

// ======================== Hooks
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// ======================== Redux
import { useDispatch, useSelector } from "react-redux";

import { getPokemonDetail, removePokemonDetail } from "../../redux/actions";

const Detail = () => {
    const { id } = useParams();

    // Get pokemon detail
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPokemonDetail(id));
        return () => {
            dispatch(removePokemonDetail());
        };
    }, [dispatch, id]);

    const pokemon = useSelector((state) => state.pokemonDetail);

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <div className={styles.textContainer}>
                    {pokemon.name &&
                        pokemon.name[0].toUpperCase() +
                            pokemon.name.substring(1)}{" "}
                    Detail
                </div>
            </div>
            {pokemon.image ? (
                <div className={styles.detailContainer}>
                    <div className={styles.leftContainer}>
                        <h1 className={styles.title}>
                            Name:{" "}
                            {pokemon.name[0].toUpperCase() +
                                pokemon.name.substring(1)}
                        </h1>
                        <p className={styles.description}>
                            Explore{" "}
                            {pokemon.name[0].toUpperCase() +
                                pokemon.name.substring(1)}
                            's stats, abilities (soon), and unique
                            characteristics. Discover everything you need to
                            train and add this exciting Pokémon to your team.
                            Don't miss a single detail!
                        </p>

                        <div className={styles.row}>
                            <p className={styles.label}>ID:</p>
                            <p className={styles.id}>{pokemon.id}</p>
                        </div>
                        <div className={styles.row}>
                            <p className={styles.label}>Life:</p>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progress}
                                    style={{
                                        width: `${
                                            pokemon.life > 100
                                                ? 100
                                                : pokemon.life
                                        }%`,
                                    }}
                                >
                                    <div className={styles.progressValue}>
                                        {pokemon.life}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <p className={styles.label}>Attack:</p>

                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progress}
                                    style={{
                                        width: `${
                                            pokemon.attack > 100
                                                ? 100
                                                : pokemon.attack
                                        }%`,
                                    }}
                                >
                                    <div className={styles.progressValue}>
                                        {pokemon.attack}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <p className={styles.label}>Defense:</p>

                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progress}
                                    style={{
                                        width: `${
                                            pokemon.defense > 100
                                                ? 100
                                                : pokemon.defense
                                        }%`,
                                    }}
                                >
                                    <div className={styles.progressValue}>
                                        {pokemon.defense}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <p className={styles.label}>Speed:</p>

                            <div className={styles.progressBar}>
                                {pokemon.speed ? (
                                    <div
                                        className={styles.progress}
                                        style={{
                                            width: `${
                                                pokemon.speed > 100
                                                    ? 100
                                                    : pokemon.speed
                                            }%`,
                                        }}
                                    >
                                        {" "}
                                        <div className={styles.progressValue}>
                                            {pokemon.speed}
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.progressValue}>
                                        UNKNOWN
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={styles.bodyStats}>
                            <span className={styles.bodyStat}>
                                Height:{" "}
                                {pokemon.height
                                    ? `${pokemon.height / 10} m`
                                    : "UNKNOWN"}
                            </span>
                            <span className={styles.bodyStat}>
                                Weight:{" "}
                                {pokemon.weight
                                    ? `${pokemon.weight / 10}Kg`
                                    : "UNKNOWN"}
                            </span>
                        </div>
                    </div>
                    <div className={styles.rightContainer}>
                        <img src={pokemon.image} alt={pokemon.name} />

                        <div className={styles.types}>
                            {pokemon.types.map((type, index) => (
                                <span
                                    key={index}
                                    className={`${styles.type} ${
                                        styles[`${type}`]
                                    }`}
                                >
                                    {type}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.loadingContainer}>
                    <span className={styles.loader}></span>
                </div>
            )}
        </div>
    );
};

export default Detail;
