// ======================== Styles
import styles from "./navbar.module.css";

// ======================== Hooks
import { useEffect } from "react";

// ======================== Redux
import { connect } from "react-redux";
import {
    getAllTypes,
    filterPokemonsByType,
    filterPokemonsBySource,
    orderPokemons,
    setPokemonsPerPage,
} from "../../redux/actions";

// ======================== Consts
import { FILTERS, SORTS } from "../../const";

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

const Navbar = (props) => {
    const {
        pokemons,
        currentPage,
        types,
        filtersValues,
        orderValue,
        filterPokemonsByType,
        filterPokemonsBySource,
        orderPokemons,
        getAllTypes,
        pokemonsPerPage,
        totalPages,
        setPokemonsPerPage,
    } = props;

    // Redux
    useEffect(() => {
        !types.length && getAllTypes();
    }, []);

    // Filters
    const handleFilterByType = (event) => {
        filterPokemonsByType(event.target.value);
    };

    const handleFilterBySource = (event) => {
        filterPokemonsBySource(event.target.value);
    };

    const handlePokemonsPerPageChange = (event) => {
        setPokemonsPerPage(event.target.value);
    };

    // Sort
    const handleOSort = (event) => {
        orderPokemons(event.target.value);
    };

    return (
        <div className={styles.navBar}>
            <div className={styles.left}>
                <span>Filters: </span>
                <select
                    value={filtersValues.byType}
                    onChange={handleFilterByType}
                >
                    <option value={FILTERS.BY_TYPE.ALL_TYPES}>All types</option>
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
                    <option value={SORTS.ATTACK_ASC}>Attack (- to +)</option>
                    <option value={SORTS.ATTACK_DESC}>Attack (+ to -)</option>
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
    );
};

const mapStateToProps = (state) => {
    return {
        currentPage: state.currentPage,
        pokemons: state.pokemons,
        types: state.types,
        filtersValues: state.filtersValues,
        orderValue: state.orderValue,
        pokemonsPerPage: state.pokemonsPerPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        filterPokemonsByType: (type) => dispatch(filterPokemonsByType(type)),
        filterPokemonsBySource: (source) =>
            dispatch(filterPokemonsBySource(source)),
        orderPokemons: (order) => dispatch(orderPokemons(order)),
        getAllTypes: () => dispatch(getAllTypes()),
        setPokemonsPerPage: (pokemonsPerPage) =>
            dispatch(setPokemonsPerPage(pokemonsPerPage)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
