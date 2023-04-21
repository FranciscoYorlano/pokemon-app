// ======================== Styles
import styles from "./create.module.css";
import pikachu from "../../assets/pikachu.png";

// ======================== Validators
import { validateCreate, validateTypes } from "../../functions/validateCreate";

// ======================== Hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ======================== Redux
import { useDispatch, useSelector } from "react-redux";
import {
    getAllTypes,
    createPokemon,
    setGlobalSuccess,
} from "../../redux/actions";

const Create = () => {
    const [newPokemon, setNewPokemon] = useState({
        name: "",
        image: "",
        life: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: [],
    });

    const [errors, setErrors] = useState({
        name: "",
        image: "",
        life: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: "",
    });

    const [buttonClicks, setButtonClicks] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get all Types
    useEffect(() => {
        dispatch(getAllTypes());
    }, [dispatch]);
    const allTypes = useSelector((state) => state.types);

    // Handlers
    const handleNameChange = (event) => {
        setNewPokemon({ ...newPokemon, name: event.target.value });
        setErrors({
            ...errors,
            name: validateCreate({ ...newPokemon, name: event.target.value })
                .name,
        });
    };

    const handleImageChange = (event) => {
        setNewPokemon({ ...newPokemon, image: event.target.value });
        setErrors({
            ...errors,
            image: validateCreate({ ...newPokemon, image: event.target.value })
                .image,
        });
    };

    const handleLifeChange = (event) => {
        setNewPokemon({ ...newPokemon, life: event.target.value });
        setErrors({
            ...errors,
            life: validateCreate({ ...newPokemon, life: event.target.value })
                .life,
        });
    };

    const handleAttackChange = (event) => {
        setNewPokemon({ ...newPokemon, attack: event.target.value });
        setErrors({
            ...errors,
            attack: validateCreate({
                ...newPokemon,
                attack: event.target.value,
            }).attack,
        });
    };

    const handleDefenseChange = (event) => {
        setNewPokemon({ ...newPokemon, defense: event.target.value });
        setErrors({
            ...errors,
            defense: validateCreate({
                ...newPokemon,
                defense: event.target.value,
            }).defense,
        });
    };

    const handleSpeedChange = (event) => {
        setNewPokemon({ ...newPokemon, speed: event.target.value });
        setErrors({
            ...errors,
            speed: validateCreate({ ...newPokemon, speed: event.target.value })
                .speed,
        });
    };

    const handleHeightChange = (event) => {
        setNewPokemon({ ...newPokemon, height: event.target.value });
        setErrors({
            ...errors,
            height: validateCreate({
                ...newPokemon,
                height: event.target.value,
            }).height,
        });
    };

    const handleWeightChange = (event) => {
        setNewPokemon({ ...newPokemon, weight: event.target.value });
        setErrors({
            ...errors,
            weight: validateCreate({
                ...newPokemon,
                weight: event.target.value,
            }).weight,
        });
    };

    const handleTypesChange = (event) => {
        const typeId = event.target.value;
        const typeName = event.target.name;

        if (event.target.checked) {
            setNewPokemon({
                ...newPokemon,
                types: [...newPokemon.types, { id: typeId, name: typeName }],
            });
            setErrors({
                ...errors,
                types: validateTypes([
                    ...newPokemon.types,
                    { id: typeId, name: typeName },
                ]),
            });
        } else {
            setNewPokemon({
                ...newPokemon,
                types: newPokemon.types.filter((type) => type.id !== typeId),
            });
            setErrors({
                ...errors,
                types: validateTypes([
                    ...newPokemon.types.filter((type) => type.id !== typeId),
                ]),
            });
        }
    };

    let buttonDisabled =
        newPokemon.name === "" ||
        Object.values(errors).some((error) => error !== "");

    const submitHandler = (event) => {
        event.preventDefault();

        if (buttonClicks === 0) {
            const validateErrors = validateCreate(newPokemon);
            const newErrors = {
                name: validateErrors.name,
                image: validateErrors.image,
                life: validateErrors.life,
                attack: validateErrors.attack,
                defense: validateErrors.defense,
                speed: validateErrors.speed,
                height: validateErrors.height,
                weight: validateErrors.weight,
                types: validateTypes(newPokemon.types),
            };
            setErrors(newErrors);
        } else {
            if (!Object.values(errors).some((error) => error !== "")) {
                const pokemonToCreate = {
                    ...newPokemon,
                    types: newPokemon.types.map((type) => Number(type.id)),
                };
                dispatch(createPokemon(pokemonToCreate));
                dispatch(setGlobalSuccess("Pokemon created successfully."));
                setNewPokemon({
                    name: "",
                    image: "",
                    life: 0,
                    attack: 0,
                    defense: 0,
                    speed: 0,
                    height: 0,
                    weight: 0,
                    types: [],
                });
                navigate("/home");
            }
        }
        setButtonClicks((prev) => prev + 1);
    };

    return (
        <div className={styles.createContainer}>
            <div className={styles.formContainer}>
                <form onSubmit={submitHandler}>
                    <div className={styles.row}>
                        <div className={styles.textInput}>
                            <label htmlFor="name">Name:</label>
                            <input
                                className={`${styles.input} ${
                                    errors.name && styles.error
                                }`}
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Pikachu"
                                value={newPokemon.name}
                                onChange={handleNameChange}
                                autoFocus
                            />
                            <span className={styles.spanError}>
                                {errors.name}
                            </span>
                        </div>
                        <div className={styles.textInput}>
                            <label htmlFor="image">Image Link:</label>
                            <input
                                className={`${styles.input} ${
                                    errors.image && styles.error
                                }`}
                                type="text"
                                id="image"
                                name="image"
                                placeholder="https://pokemon.com/pikachu.png"
                                value={newPokemon.image}
                                onChange={handleImageChange}
                            />
                            <span className={styles.spanError}>
                                {errors.image}
                            </span>
                        </div>
                    </div>

                    <div className={styles.statsRow}>
                        <div className={styles.stat}>
                            <label htmlFor="life">Life:</label>
                            <input
                                className={`${styles.input} ${
                                    errors.life && styles.error
                                } ${styles.statInput}`}
                                type="number"
                                id="life"
                                name="life"
                                value={newPokemon.life}
                                onChange={handleLifeChange}
                            />
                            <span className={styles.spanError}>
                                {errors.life}
                            </span>
                        </div>
                        <div className={styles.stat}>
                            <label htmlFor="attack">Attack:</label>
                            <input
                                className={`${styles.input} ${
                                    errors.attack && styles.error
                                } ${styles.statInput}`}
                                type="number"
                                id="attack"
                                name="attack"
                                value={newPokemon.attack}
                                onChange={handleAttackChange}
                            />
                            <span className={styles.spanError}>
                                {errors.attack}
                            </span>
                        </div>
                        <div className={styles.stat}>
                            <label htmlFor="defense">Defense:</label>
                            <input
                                className={`${styles.input} ${
                                    errors.defense && styles.error
                                } ${styles.statInput}`}
                                type="number"
                                id="defense"
                                name="defense"
                                value={newPokemon.defense}
                                onChange={handleDefenseChange}
                            />
                            <span className={styles.spanError}>
                                {errors.defense}
                            </span>
                        </div>
                    </div>

                    <div className={styles.statsRow}>
                        <div className={styles.stat}>
                            <label htmlFor="speed">Speed:</label>
                            <input
                                className={`${styles.input} ${
                                    errors.speed && styles.error
                                } ${styles.statInput}`}
                                type="number"
                                id="speed"
                                name="speed"
                                value={newPokemon.speed}
                                onChange={handleSpeedChange}
                            />
                            <span className={styles.spanError}>
                                {errors.speed}
                            </span>
                        </div>
                        <div className={styles.stat}>
                            <label htmlFor="height">Height:</label>
                            <input
                                className={`${styles.input} ${
                                    errors.height && styles.error
                                } ${styles.statInput}`}
                                type="number"
                                id="height"
                                name="height"
                                value={newPokemon.height}
                                onChange={handleHeightChange}
                            />
                            <span className={styles.spanError}>
                                {errors.height}
                            </span>
                        </div>
                        <div className={styles.stat}>
                            <label htmlFor="weight">Weight:</label>
                            <input
                                className={`${styles.input} ${
                                    errors.weight && styles.error
                                } ${styles.statInput}`}
                                type="number"
                                id="weight"
                                name="weight"
                                value={newPokemon.weight}
                                onChange={handleWeightChange}
                            />
                            <span className={styles.spanError}>
                                {errors.weight}
                            </span>
                        </div>
                    </div>
                    {allTypes.length ? (
                        <div className={styles.typesSelectors}>
                            {allTypes.length &&
                                allTypes.map((type) => (
                                    <div
                                        className={styles.typeSelector}
                                        key={type.id}
                                    >
                                        <label>
                                            <input
                                                type="checkbox"
                                                id={type.id}
                                                value={type.id}
                                                name={type.name}
                                                onChange={handleTypesChange}
                                            />
                                            {type.name}
                                        </label>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className={styles.loadingContainer}>
                            <span class={styles.loader}></span>
                        </div>
                    )}
                    <span className={styles.spanError}>{errors.types}</span>

                    <button
                        disabled={buttonDisabled}
                        className={styles.buttonSubmit}
                    >
                        Create
                    </button>
                </form>
            </div>
            <div className={styles.previewContainer}>
                <h1 className={styles.title}>Catch Your Dream Pokemon!</h1>
                <p className={styles.description}>
                    Let your imagination run wild as you design your dream
                    Pokemon.
                </p>

                <img
                    src={
                        newPokemon.image.slice(-3) === "png" && !errors.image
                            ? newPokemon.image
                            : pikachu
                    }
                    alt="Create Pokemon"
                />
                <div className={styles.info}>
                    <h2>
                        {newPokemon.name.length && !errors.name
                            ? newPokemon.name.replace(/\s(?=\w)/g, "")
                            : "Your pokemon"}
                    </h2>
                </div>
                {newPokemon.types.length && !errors.types ? (
                    <div className={styles.types}>
                        {newPokemon.types.map((type) => (
                            <span
                                key={type.id}
                                className={`${styles.type} ${
                                    styles[`${type.name}`]
                                }`}
                            >
                                {type.name}
                            </span>
                        ))}
                    </div>
                ) : (
                    <div className={styles.types}></div>
                )}

                <p className={styles.previewText}>(Preview)</p>
            </div>
        </div>
    );
};

export default Create;
