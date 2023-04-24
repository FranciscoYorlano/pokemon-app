// ======================== Styles
import styles from "./home.module.css";

// ======================== Components
import CardContainer from "../../components/cardContainer/CardContainer";
import Navbar from "../../components/navbar/Navbar";
import Pagination from "../../components/pagination/Pagination";

// ======================== Hooks
import { useState, useEffect } from "react";

// ======================== Redux
import { connect } from "react-redux";

import {
    getAllPokemons,
    getUserPokemonByUserId,
    setCurrentPage,
} from "../../redux/actions";

const Home = (props) => {
    const {
        pokemons,
        isLogin,
        userData,
        userPokemons,
        currentPage,
        pokemonsPerPage,
    } = props;

    const { getAllPokemons, getUserPokemonByUserId } = props;

    // Pagination
    const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    const paginatedPokemonsPre = pokemons.slice(
        (currentPage - 1) * pokemonsPerPage,
        currentPage * pokemonsPerPage
    );
    const paginatedPokemons = paginatedPokemonsPre.map((pokemon) => ({
        ...pokemon,
        isFav: userPokemons.map((fav) => fav.PokemonId).includes(pokemon.id),
    }));

    // Redux
    useEffect(() => {
        !pokemons.length && getAllPokemons();
        if (isLogin) {
            !userPokemons.length && getUserPokemonByUserId(userData.id);
        }
    }, []);

    return (
        <div className={styles.homeContainer}>
            <div className={styles.homeImage}>
                <div className={styles.textContainer}>
                    <button className={styles.buttonPrimary}>
                        franyorlano's collection
                    </button>
                </div>
            </div>
            <Navbar totalPages={totalPages} />

            {pokemons.length ? (
                <CardContainer paginatedPokemons={paginatedPokemons} />
            ) : (
                <div className={styles.loadingContainer}>
                    <span className={styles.loader}></span>
                </div>
            )}
            <Pagination totalPages={totalPages} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        pokemons: state.pokemons,
        currentPage: state.currentPage,
        isLogin: state.isLogin,
        userData: state.userData,
        userPokemons: state.userPokemons,
        pokemonsPerPage: state.pokemonsPerPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllPokemons: () => dispatch(getAllPokemons()),
        getUserPokemonByUserId: (userId) =>
            dispatch(getUserPokemonByUserId(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
