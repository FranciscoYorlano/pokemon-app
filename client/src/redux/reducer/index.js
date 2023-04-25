// ======================== Action Types
import {
    GLOBAL_ERROR_SET,
    GLOBAL_ERROR_REMOVE,
    GLOBAL_SUCCESS_SET,
    GLOBAL_SUCCESS_REMOVE,
    ALL_POKEMONS_GET,
    POKEMONS_FILTER_BY_TYPE,
    POKEMONS_FILTER_BY_SOURCE,
    POKEMONS_SORT,
    POKEMONS_RESET,
    POKEMONS_BY_NAME_GET,
    POKEMON_DETAIL_GET,
    POKEMON_DETAIL_REMOVE,
    TYPES_GET,
    CREATE_POKEMON,
    USER_CREATE,
    USER_VALIDATE,
    USER_ERROR,
    USER_ERROR_REMOVE,
    USER_SIGN_OUT,
    USER_POKEMONS_GET,
    USER_POKEMONS_REMOVE,
    USER_POKEMON_ADD,
    USER_POKEMON_DELETE,
    SET_CURRENT_PAGE,
    SET_POKEMONS_PER_PAGE,
    USER_FAVORITES_SET,
} from "../actions";

// ======================== Consts
import { FILTERS, SORTS } from "../../const";
const { BY_TYPE, BY_SOURCE } = FILTERS;

// ======================== Initial State

const initialState = {
    // Global info
    globalError: "",
    globalSuccess: "",

    // Pokemons
    allPokemons: [],
    pokemons: [],
    userPokemons: [],

    // Types & detail
    types: [],
    pokemonDetail: {},

    // User view data
    filtersValues: {
        byType: BY_TYPE.ALL_TYPES,
        bySource: BY_SOURCE.ALL_SOURCES,
    },
    sort: SORTS.DEFAULT,
    currentPage: 1,
    pokemonsPerPage: 12,

    // User
    isLogin: false,
    userData: {},
    signInError: "",
};

// ======================== Apply filters function
const applyFilters = (allPokemons, byType, bySource) => {
    let filteredPokemons = [...allPokemons];

    if (byType !== BY_TYPE.ALL_TYPES) {
        filteredPokemons = filteredPokemons.filter((p) =>
            p.types.includes(byType)
        );
    }

    if (bySource !== BY_SOURCE.ALL_SOURCES) {
        filteredPokemons = filteredPokemons.filter((p) => {
            if (bySource === BY_SOURCE.DATABASE) {
                return isNaN(p.id) === true;
            }
            if (bySource === BY_SOURCE.POKEAPI) {
                return isNaN(p.id) === false;
            }
            return true;
        });
    }

    return filteredPokemons;
};

// ======================== Root Reducer

const rootReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        // Global Error
        case GLOBAL_ERROR_SET:
            return { ...state, globalError: action.payload };
        case GLOBAL_ERROR_REMOVE:
            return { ...state, globalError: "" };

        // Global Success
        case GLOBAL_SUCCESS_SET:
            return { ...state, globalSuccess: action.payload };
        case GLOBAL_SUCCESS_REMOVE:
            return { ...state, globalSuccess: "" };

        // All pokemons
        case ALL_POKEMONS_GET:
            return {
                ...state,
                allPokemons: action.payload,
                pokemons: action.payload,
            };

        // Pokemons
        case POKEMONS_FILTER_BY_TYPE:
            const filteredPokemonsByType = applyFilters(
                state.allPokemons,
                action.payload,
                state.filtersValues.bySource
            );

            return {
                ...state,
                pokemons: filteredPokemonsByType,
                filtersValues: {
                    ...state.filtersValues,
                    byType: action.payload,
                },
            };
        case POKEMONS_FILTER_BY_SOURCE:
            const filteredPokemonsBySource = applyFilters(
                state.allPokemons,
                state.filtersValues.byType,
                action.payload
            );

            return {
                ...state,
                pokemons: filteredPokemonsBySource,
                filtersValues: {
                    ...state.filtersValues,
                    bySource: action.payload,
                },
            };

        case POKEMONS_SORT:
            let orderedPokemons = [...state.pokemons];

            switch (action.payload) {
                case SORTS.DEFAULT:
                    return {
                        ...state,
                        pokemons: state.allPokemons,
                        sort: action.payload,
                    };
                case SORTS.ALPHABETICAL_ASC:
                    orderedPokemons.sort((a, b) =>
                        a.name.localeCompare(b.name)
                    );
                    break;
                case SORTS.ALPHABETICAL_DESC:
                    orderedPokemons.sort((a, b) =>
                        b.name.localeCompare(a.name)
                    );
                    break;
                case SORTS.ATTACK_ASC:
                    orderedPokemons.sort((a, b) => a.attack - b.attack);
                    break;
                case SORTS.ATTACK_DESC:
                    orderedPokemons.sort((a, b) => b.attack - a.attack);
                    break;
                default:
                    break;
            }
            return {
                ...state,
                pokemons: orderedPokemons,
                sort: action.payload,
            };
        case POKEMONS_RESET:
            return { ...state, pokemons: state.allPokemons };
        case POKEMONS_BY_NAME_GET:
            return { ...state, pokemons: action.payload };
        case USER_FAVORITES_SET:
            return {
                ...state,
                pokemons: state.userPokemons,
            };
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload };
        case SET_POKEMONS_PER_PAGE:
            return {
                ...state,
                pokemonsPerPage: action.payload,
            };

        // Pokemon Detail
        case POKEMON_DETAIL_GET:
            return { ...state, pokemonDetail: action.payload };
        case POKEMON_DETAIL_REMOVE:
            return { ...state, pokemonDetail: {} };

        // Types
        case TYPES_GET:
            return { ...state, types: action.payload };

        // Create Pokemon
        case CREATE_POKEMON:
            return {
                ...state,
                allPokemons: [...state.allPokemons, action.payload],
                pokemons: [...state.pokemons, action.payload],
            };

        // Users
        case USER_CREATE:
            return {
                ...state,
            };
        case USER_VALIDATE:
            return {
                ...state,
                signInError: "",
                isLogin: true,
                userData: action.payload,
                signInError: "",
            };
        case USER_ERROR:
            return {
                ...state,
                signInError: action.payload,
            };
        case USER_ERROR_REMOVE:
            return {
                ...state,
                signInError: "",
            };

        case USER_SIGN_OUT:
            return {
                ...state,
                isLogin: false,
                userData: {},
                userPokemons: [],
            };

        // User Pokemons
        case USER_POKEMONS_GET:
            return {
                ...state,
                userPokemons: action.payload,
            };

        case USER_POKEMONS_REMOVE:
            return {
                ...state,
                userPokemons: [],
            };

        case USER_POKEMON_ADD:
            return {
                ...state,
                userPokemons: [...state.userPokemons, action.payload],
            };
        case USER_POKEMON_DELETE:
            return {
                ...state,
                userPokemons: state.userPokemons.filter(
                    (pokemon) => pokemon.id !== action.payload
                ),
            };

        default:
            return { ...state };
    }
};

export default rootReducer;
