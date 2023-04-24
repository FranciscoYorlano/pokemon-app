// ======================== Styles
import styles from "./home.module.css";
import homeImage from "../../assets/homeImg.jpg";

// ======================== Components
import CardContainer from "../../components/cardContainer/CardContainer";
import Pagination from "../../components/pagination/Pagination";

// ======================== Hooks
import { useState, useEffect } from "react";

// ======================== Redux
import { connect } from "react-redux";

// ======================== Consts
import { FILTERS, SORTS } from "../../const";

import {
    getAllPokemons,
    filterPokemonsByType,
    filterPokemonsBySource,
    orderPokemons,
    getAllTypes,
    getUserPokemonByUserId,
} from "../../redux/actions";

// ======================== Components
const SelectType = ({ type, pokemons }) => {
    const count = pokemons.filter((pokemon) =>
        pokemon.types.includes(type)
    ).length;
    const typeName = type[0].toUpperCase() + type.substring(1);
    return (
        <option value={type}>
            {typeName} ({count})
        </option>
    );
};

const SelectSource = ({ pokemons }) => {
    const dataBasePokemons = pokemons.filter(
        (pokemon) => isNaN(pokemon.id) === true
    ).length;
    const pokeApiPokemons = pokemons.filter(
        (pokemon) => isNaN(pokemon.id) === false
    ).length;
    return (
        <>
            <option value={FILTERS.BY_SOURCE.DATABASE}>
                Created ({dataBasePokemons})
            </option>
            <option value={FILTERS.BY_SOURCE.POKEAPI}>
                Originals ({pokeApiPokemons})
            </option>
        </>
    );
};

const Home = (props) => {
    const {
        pokemons,
        types,
        filtersValues,
        orderValue,
        isLogin,
        userData,
        userPokemons,
    } = props;

    const {
        getAllPokemons,
        filterPokemonsByType,
        filterPokemonsBySource,
        orderPokemons,
        getAllTypes,
        getUserPokemonByUserId,
    } = props;

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    const paginatedPokemons = pokemons.slice(
        (currentPage - 1) * pokemonsPerPage,
        currentPage * pokemonsPerPage
    );
    const handlePageChange = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    // Redux
    useEffect(() => {
        !pokemons.length && getAllPokemons();
        !types.length && getAllTypes();
        if (isLogin) {
            !userPokemons.length && getUserPokemonByUserId(userData.id);
        }
    }, []);

    // Filters
    const handleFilterByType = (event) => {
        filterPokemonsByType(event.target.value);
        setCurrentPage(1);
    };

    const handleFilterBySource = (event) => {
        filterPokemonsBySource(event.target.value);
        setCurrentPage(1);
    };

    const handlePokemonsPerPageChange = (event) => {
        setPokemonsPerPage(event.target.value);
        setCurrentPage(1);
    };

    // Sort
    const handleOSort = (event) => {
        orderPokemons(event.target.value);
        setCurrentPage(1);
    };

    return (
        <div className={styles.homeContainer}>
            <div className={styles.homeImage}></div>
            <div className={styles.navBar}>
                <div className={styles.left}>
                    <span>Filters: </span>
                    <select
                        value={filtersValues.byType}
                        onChange={handleFilterByType}
                    >
                        <option value={FILTERS.BY_TYPE.ALL_TYPES}>
                            All types
                        </option>
                        {types.map((type) => (
                            <SelectType
                                key={type.id}
                                type={type.name}
                                pokemons={pokemons}
                            />
                        ))}
                    </select>
                    <select
                        value={filtersValues.bySource}
                        onChange={handleFilterBySource}
                    >
                        <option value={FILTERS.BY_SOURCE.ALL_SOURCES}>
                            All sources
                        </option>
                        <SelectSource pokemons={pokemons} />
                    </select>
                    <span>Sort:</span>
                    <select value={orderValue} onChange={handleOSort}>
                        <option value={SORTS.DEFAULT}>Default</option>
                        <option value={SORTS.ALPHABETICAL_ASC}>(A-Z)</option>
                        <option value={SORTS.ALPHABETICAL_DESC}>(Z-A)</option>
                        <option value={SORTS.ATTACK_ASC}>
                            Attack (- to +)
                        </option>
                        <option value={SORTS.ATTACK_DESC}>
                            Attack (+ to -)
                        </option>
                    </select>
                    <span>Show:</span>
                    <select
                        value={pokemonsPerPage}
                        onChange={handlePokemonsPerPageChange}
                        className={styles.pageSelector}
                    >
                        <option value="10">10</option>
                        <option value="12">12</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <div className={styles.right}>
                    <span>{pokemons.length} results</span>
                    <div className={styles.yLine}></div>
                    <span>
                        Page {currentPage}/{totalPages}
                    </span>
                </div>
            </div>
            {pokemons.length ? (
                <CardContainer
                    paginatedPokemons={paginatedPokemons}
                    userPokemons={userPokemons}
                />
            ) : (
                <div className={styles.loadingContainer}>
                    <span className={styles.loader}></span>
                </div>
            )}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
            />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        pokemons: state.pokemons,
        types: state.types,
        filtersValues: state.filtersValues,
        orderValue: state.orderValue,
        isLogin: state.isLogin,
        userData: state.userData,
        userPokemons: state.userPokemons,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllPokemons: () => dispatch(getAllPokemons()),
        filterPokemonsByType: (type) => dispatch(filterPokemonsByType(type)),
        filterPokemonsBySource: (source) =>
            dispatch(filterPokemonsBySource(source)),
        orderPokemons: (order) => dispatch(orderPokemons(order)),
        getAllTypes: () => dispatch(getAllTypes()),
        getUserPokemonByUserId: (userId) =>
            dispatch(getUserPokemonByUserId(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
