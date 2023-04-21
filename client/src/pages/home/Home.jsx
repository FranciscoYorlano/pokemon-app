// ======================== Styles
import styles from "./home.module.css";

// ======================== Components
import CardContainer from "../../components/cardContainer/CardContainer";
import Pagination from "../../components/pagination/Pagination";

// ======================== Hooks
import { useState, useEffect } from "react";

// ======================== Redux
import { connect } from "react-redux";

import {
    getAllPokemons,
    filterPokemonsByType,
    filterPokemonsBySource,
    orderPokemons,
    getAllTypes,
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
            <option key="0" value="dataBase">
                Created ({dataBasePokemons})
            </option>
            <option
                key="1"
                value="pokeApi"
                disabled={!Boolean(pokeApiPokemons)}
            >
                Originals ({pokeApiPokemons})
            </option>
        </>
    );
};

const Home = (props) => {
    const { pokemons, types, filtersValues, orderValue } = props;

    const {
        getAllPokemons,
        filterPokemonsByType,
        filterPokemonsBySource,
        orderPokemons,
        getAllTypes,
    } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const [filterType, setFilterType] = useState(filtersValues.byType);
    const [filterSource, setFilterSource] = useState(filtersValues.bySource);
    const [order, setOrder] = useState(orderValue);

    useEffect(() => {
        !pokemons.length && getAllPokemons();
        !types.length && getAllTypes();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [pokemons]);

    // Paginated
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

    // Filters
    const handleFilterByType = (event) => {
        setFilterType(event.target.value);
        filterPokemonsByType(event.target.value);
        setCurrentPage(1);
    };

    const handleFilterBySource = (event) => {
        setFilterSource(event.target.value);
        filterPokemonsBySource(event.target.value);
        setCurrentPage(1);
    };

    // Order
    const handleOrder = (event) => {
        setOrder(event.target.value);
        orderPokemons(event.target.value);
        setCurrentPage(1);
    };

    return (
        <div className={styles.homeContainer}>
            <div className={styles.navBar}>
                <div className={styles.filterContainer}>
                    <span>Filters:</span>
                    <select value={filterType} onChange={handleFilterByType}>
                        <option value="allTypes">All types</option>
                        {types.map((type) => (
                            <SelectType
                                key={type.id}
                                type={type.name}
                                pokemons={pokemons}
                            />
                        ))}
                    </select>
                    <select
                        value={filterSource}
                        onChange={handleFilterBySource}
                    >
                        <option value="allSources">All sources</option>
                        <SelectSource pokemons={pokemons} />
                    </select>
                </div>
                <div className={styles.topPagination}>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />
                </div>
                <div className={styles.sortContainer}>
                    <span>Sort: </span>
                    <select value={order} onChange={handleOrder}>
                        <option value="defaul">Default</option>
                        <option value="alphabeticalAsc">
                            Alphabetical (A-Z)
                        </option>
                        <option value="alphabeticalDesc">
                            Alphabetical (Z-A)
                        </option>
                        <option value="attackAsc">Attack (low to high)</option>
                        <option value="attackDesc">Attack (high to low)</option>
                    </select>
                </div>
            </div>
            {pokemons.length ? (
                <CardContainer paginatedPokemons={paginatedPokemons} />
            ) : (
                <div className={styles.loadingContainer}>
                    <span className={styles.loader}></span>
                </div>
            )}
            <div className={styles.navBarMobile}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        pokemons: state.pokemons,
        types: state.types,
        filtersValues: state.filtersValues,
        orderValue: state.orderValue,
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
