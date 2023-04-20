const REGEX_URL =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

export const validateCreate = (newPokemon) => {
    const { name, image, life, attack, defense, speed, height, weight } =
        newPokemon;

    const errors = {
        name: "",
        image: "",
        life: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
    };

    if (!name) {
        errors.name = "Name is required.";
    } else {
        if (name.length > 20)
            errors.name = "Name should not be longer than 20 characters.";
    }

    if (!image) {
        errors.image = "Image is required.";
    } else {
        if (!REGEX_URL.test(image)) {
            errors.image = "Image url is invalid.";
        }
    }

    if (!life) {
        errors.life = "Life is required.";
    } else {
        if (life < 0) errors.life = "Life must be greater or equal to zero";
    }

    if (!attack) {
        errors.attack = "Attack is required.";
    } else {
        if (attack < 0)
            errors.attack = "Attack must be greater or equal to zero";
    }

    if (!defense) {
        errors.defense = "Defense is required.";
    } else {
        if (defense < 0)
            errors.defense = "Defense must be greater or equal to zero";
    }

    if (speed < 0) errors.speed = "speed must be greater or equal to zero";

    if (height < 0) errors.height = "Height must be greater or equal to zero";

    if (weight < 0) errors.weight = "Weight must be greater or equal to zero";

    return errors;
};

export const validateTypes = (types) => {
    if (types.length === 0) return "Pokemons must have at least one type";

    if (types.length > 3) return "Pokemon must not have more than 3 types.";

    return "";
};
