import express from "express"
const router = express.Router();

// Ejemplo de datos de juego
let gameData = [
    { id: 1, name: 'Zippy', type: 'Fox', level: 5 },
    { id: 2, name: 'Fluffy', type: 'Rabbit', level: 3 },
];

// Obtener todos los personajes
router.get('/', (req, res) => {
    res.json(gameData);
});

// Obtener un personaje por ID
router.get('/:id', (req, res) => {
    const character = gameData.find(c => c.id === parseInt(req.params.id));
    if (!character) return res.status(404).send('Character not found');
    res.json(character);
});

// Crear un nuevo personaje
router.post('/', (req, res) => {
    const newCharacter = {
        id: gameData.length + 1,
        name: req.body.name,
        type: req.body.type,
        level: req.body.level,
    };
    gameData.push(newCharacter);
    res.status(201).json(newCharacter);
});

// Actualizar un personaje
router.put('/:id', (req, res) => {
    const character = gameData.find(c => c.id === parseInt(req.params.id));
    if (!character) return res.status(404).send('Character not found');

    character.name = req.body.name;
    character.type = req.body.type;
    character.level = req.body.level;
    res.json(character);
});

// Eliminar un personaje
router.delete('/:id', (req, res) => {
    const characterIndex = gameData.findIndex(c => c.id === parseInt(req.params.id));
    if (characterIndex === -1) return res.status(404).send('Character not found');

    const deletedCharacter = gameData.splice(characterIndex, 1);
    res.json(deletedCharacter);
});

export default router;