import axios from "axios";
import { BACKEND_BASE_URI } from "../../config";

// ======================== Action Types

// Global Error
export const GLOBAL_ERROR_SET = "GLOBAL_ERROR_SET";
export const GLOBAL_ERROR_REMOVE = "GLOBAL_ERROR_REMOVE";

// Global Success
export const GLOBAL_SUCCESS_SET = "GLOBAL_SUCCESS_SET";
export const GLOBAL_SUCCESS_REMOVE = "GLOBAL_SUCCESS_REMOVE";

// All Pokemons
export const ALL_POKEMONS_GET = "GET_ALL_POKEMONS";

// Search value
export const SEARCH_VALUE_SET = "SEARCH_VALUE_SET";
export const SEARCH_VALUE_REMOVE = "SEARCH_VALUE_REMOVE";

// Pokemons
export const POKEMONS_FILTER_BY_TYPE = "POKEMONS_FILTER_BY_TYPE";
export const POKEMONS_FILTER_BY_SOURCE = "POKEMONS_FILTER_BY_SOURCE";
export const POKEMONS_ORDER = "POKEMONS_ORDER";
export const POKEMONS_REMOVE = "POKEMONS_REMOVE";
export const POKEMONS_BY_NAME_GET = "POKEMONS_GET_BY_NAME";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_CURRENT_PAGE_USER_PAGE = "SET_CURRENT_PAGE_USER_PAGE";

// Pokemon Detail
export const POKEMON_DETAIL_GET = "POKEMON_DETAIL_GET";
export const POKEMON_DETAIL_REMOVE = "POKEMON_DETAIL_REMOVE";

// Types
export const TYPES_GET = "TYPES_GET";

// Create Pokemon
export const CREATE_POKEMON = "CREATE_POKEMON";

// Users
export const USER_CREATE = "USER_CREATE";
export const USER_VALIDATE = "USER_VALIDATE";
export const USER_ERROR = "USER_ERROR";
export const USER_ERROR_REMOVE = "USER_ERROR_REMOVE";
export const USER_SIGN_OUT = "USER_SIGN_OUT";

// Users Pokemons
export const USER_POKEMONS_SET = "USER_POKEMONS_SET";
export const USER_POKEMONS_REMOVE = "USER_POKEMONS_REMOVE";
export const USER_POKEMONS_ADD = "USER_POKEMONS_ADD";
export const USER_POKEMONS_DELETE = "USER_POKEMONS_DELETE";

// ======================== Action Creators
export const setGlobalError = (error) => {
    return {
        type: GLOBAL_ERROR_SET,
        payload: error,
    };
};

export const removeGlobalError = () => {
    return {
        type: GLOBAL_ERROR_REMOVE,
    };
};

export const setGlobalSuccess = (message) => {
    return {
        type: GLOBAL_SUCCESS_SET,
        payload: message,
    };
};

export const removeGlobalSuccess = () => {
    return {
        type: GLOBAL_SUCCESS_REMOVE,
    };
};

export const getAllPokemons = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${BACKEND_BASE_URI}/pokemons`);
            const pokemons = response.data;
            dispatch({ type: ALL_POKEMONS_GET, payload: pokemons });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.response.data.error,
            });
        }
    };
};

export const setSearchValue = (value) => {
    return {
        type: SEARCH_VALUE_SET,
        payload: value,
    };
};

export const removeSearchValue = () => {
    return {
        type: SEARCH_VALUE_REMOVE,
    };
};

export const filterPokemonsByType = (type) => {
    return {
        type: POKEMONS_FILTER_BY_TYPE,
        payload: type,
    };
};

export const filterPokemonsBySource = (source) => {
    return {
        type: POKEMONS_FILTER_BY_SOURCE,
        payload: source,
    };
};

export const orderPokemons = (order) => {
    return {
        type: POKEMONS_ORDER,
        payload: order,
    };
};

export const removePokemons = () => {
    return {
        type: POKEMONS_REMOVE,
    };
};

export const getPokemonsByName = (name) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `${BACKEND_BASE_URI}/pokemons?name=${name}`
            );
            const pokemons = response.data;
            dispatch({ type: POKEMONS_BY_NAME_GET, payload: pokemons });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.response.data.error,
            });
        }
    };
};

export const setCurrentPage = (page) => {
    return {
        type: SET_CURRENT_PAGE,
        payload: page,
    };
};

export const setCurrentPageUserPage = (page) => {
    return {
        type: SET_CURRENT_PAGE_USER_PAGE,
        payload: page,
    };
};

export const getPokemonDetail = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `${BACKEND_BASE_URI}/pokemons/${id}`
            );
            const pokemon = response.data;
            dispatch({ type: POKEMON_DETAIL_GET, payload: pokemon });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.response.data.error,
            });
        }
    };
};

export const removePokemonDetail = () => {
    return {
        type: POKEMON_DETAIL_REMOVE,
    };
};

export const getAllTypes = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${BACKEND_BASE_URI}/types`);
            const types = response.data;
            dispatch({ type: TYPES_GET, payload: types });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.response.data.error,
            });
        }
    };
};

export const createPokemon = (newPokemon) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `${BACKEND_BASE_URI}/pokemons`,
                newPokemon
            );
            const createdPokemon = response.data;
            dispatch({
                type: CREATE_POKEMON,
                payload: createdPokemon,
            });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.response.data.error,
            });
        }
    };
};

export const createUser = (userData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `${BACKEND_BASE_URI}/users`,
                userData
            );
            const newUser = response.data;
            dispatch({
                type: USER_CREATE,
                payload: newUser,
            });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.response.data.error,
            });
        }
    };
};

export const validateUser = (userData) => {
    return async (dispatch) => {
        try {
            const { email, password } = userData;
            const response = await axios.get(
                `${BACKEND_BASE_URI}/users?email=${email}&password=${password}`
            );
            dispatch({
                type: USER_VALIDATE,
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: USER_ERROR,
                payload: error.response.data.error,
            });
        }
    };
};

export const removeUserError = () => {
    return {
        type: USER_ERROR_REMOVE,
    };
};

export const signout = () => {
    return {
        type: USER_SIGN_OUT,
    };
};

export const getUserPokemonByUserId = (userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `${BACKEND_BASE_URI}/userspokemons/${userId}`
            );
            dispatch({
                type: USER_POKEMONS_SET,
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.response.data.error,
            });
        }
    };
};

export const removeUserPokemons = () => {
    return {
        type: USER_POKEMONS_REMOVE,
    };
};

export const addPokemonToUserPokemons = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `${BACKEND_BASE_URI}/userspokemons`,
                data
            );
            dispatch({
                type: USER_POKEMONS_ADD,
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.response.data.error,
            });
        }
    };
};

export const deletePokemonFromUserPokemons = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(
                `${BACKEND_BASE_URI}/userspokemons?userId=${data.userId}&pokemonId=${data.pokemonId}`
            );
            dispatch({
                type: USER_POKEMONS_DELETE,
                payload: data.pokemonId,
            });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.response.data.error,
            });
        }
    };
};
