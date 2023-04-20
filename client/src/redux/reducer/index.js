// ======================== Action Types
import {
    GLOBAL_ERROR_SET,
    GLOBAL_ERROR_REMOVE,
    GLOBAL_SUCCESS_SET,
    GLOBAL_SUCCESS_REMOVE,
    ALL_POKEMONS_GET,
    POKEMONS_FILTER_BY_TYPE,
    POKEMONS_FILTER_BY_SOURCE,
    POKEMONS_ORDER,
    POKEMONS_REMOVE,
    POKEMONS_BY_NAME_GET,
    POKEMON_DETAIL_GET,
    POKEMON_DETAIL_REMOVE,
    TYPES_GET,
    CREATE_POKEMON,
} from "../actions";

// ======================== Initial State

const initialState = {
    globalError: "",
    globalSuccess: "",
    allPokemons: [],
    pokemons: [],
    filtersValues: {
        byType: "allTypes",
        bySource: "allSources",
    },
    orderValue: "defaul",
    pokemonDetail: {},
    types: [],
};

// ======================== Root Reducer

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        // Global Error - SETTER, REMOVER
        case GLOBAL_ERROR_SET:
            return { ...state, globalError: action.payload };
        case GLOBAL_ERROR_REMOVE:
            return { ...state, globalError: "" };

        // Global Success - SETTER, REMOVER
        case GLOBAL_SUCCESS_SET:
            return { ...state, globalSuccess: action.payload };
        case GLOBAL_SUCCESS_REMOVE:
            return { ...state, globalSuccess: "" };

        // All pokemons - SETTER
        case ALL_POKEMONS_GET:
            return {
                ...state,
                allPokemons: action.payload,
                pokemons: action.payload,
            };

        // Pokemons - SETTER, FILTER (2), ORDER, REMOVER, SETTER BY NAME
        case POKEMONS_FILTER_BY_TYPE:
            if (action.payload === "allTypes") {
                return {
                    ...state,
                    pokemons: state.allPokemons,
                    filtersValues: {
                        ...state.filtersValues,
                        bySource: "allSources",
                        byType: action.payload,
                    },
                };
            }

            const filteredPokemonsByType = state.pokemons.filter((p) =>
                p.types.includes(action.payload)
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
            if (action.payload === "allSources") {
                return {
                    ...state,
                    pokemons: state.allPokemons,
                    filtersValues: {
                        ...state.filtersValues,
                        bySource: action.payload,
                        byType: "allTypes",
                    },
                };
            }

            let filteredPokemonsBySource = {};

            if (action.payload === "dataBase") {
                filteredPokemonsBySource = state.pokemons.filter(
                    (p) => isNaN(p.id) === true
                );
            }
            if (action.payload === "pokeApi") {
                filteredPokemonsBySource = state.pokemons.filter(
                    (p) => isNaN(p.id) === false
                );
            }

            return {
                ...state,
                pokemons: filteredPokemonsBySource,
                filtersValues: {
                    ...state.filtersValues,
                    bySource: action.payload,
                },
            };

        case POKEMONS_ORDER:
            let orderedPokemons = [...state.pokemons];

            switch (action.payload) {
                case "default":
                    return {
                        ...state,
                        pokemons: state.allPokemons,
                        orderValue: action.payload,
                    };
                case "alphabeticalAsc":
                    orderedPokemons.sort((a, b) =>
                        a.name.localeCompare(b.name)
                    );
                    break;
                case "alphabeticalDesc":
                    orderedPokemons.sort((a, b) =>
                        b.name.localeCompare(a.name)
                    );
                    break;
                case "attackAsc":
                    orderedPokemons.sort((a, b) => a.attack - b.attack);
                    break;
                case "attackDesc":
                    orderedPokemons.sort((a, b) => b.attack - a.attack);
                    break;
                default:
                    break;
            }
            return {
                ...state,
                pokemons: orderedPokemons,
                orderValue: action.payload,
            };
        case POKEMONS_REMOVE:
            return { ...state, pokemons: state.allPokemons };
        case POKEMONS_BY_NAME_GET:
            return { ...state, pokemons: action.payload };

        // Pokemon Detail - SETTER, REMOVER
        case POKEMON_DETAIL_GET:
            return { ...state, pokemonDetail: action.payload };
        case POKEMON_DETAIL_REMOVE:
            return { ...state, pokemonDetail: {} };

        // Types - SETTER
        case TYPES_GET:
            return { ...state, types: action.payload };

        // Create Pokemon
        case CREATE_POKEMON:
            return {
                ...state,
                allPokemons: [...state.allPokemons, action.payload],
                pokemons: [...state.pokemons, action.payload],
            };

        default:
            return { ...state };
    }
};

export default rootReducer;
