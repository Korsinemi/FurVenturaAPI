import Event from '../models/eventModel.js';

const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createEvent = async (req, res) => {
    const { icon, name, /* type, */ rewards, participants, duration, status } = req.body;

    try {
        const lastEvent = await Event.findOne().sort({ id: -1 });
        const newId = lastEvent ? lastEvent.id + 1 : 1;

        const newEvent = new Event({ id: newId, icon, name, /* type, */ rewards, participants, duration, status });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { icon, name, /* type, */ rewards, participants, duration, status } = req.body;

    console.log('Datos recibidos para actualizar:', { id, icon, name, /* type, */ rewards, participants, duration, status });

    try {
        const updatedEvent = await Event.findOneAndUpdate({ id }, { icon, name, /* type, */ rewards, participants, duration, status }, { new: true });
        if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error('Error al actualizar el evento:', error);
        res.status(400).json({ message: error.message });
    }
};

const deleteEvent = async (req, res) => {
    const { id } = req.params;

    console.log('ID recibido para eliminar:', id);

    try {
        const deletedEvent = await Event.findOneAndDelete({ id });
        if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(deletedEvent);
    } catch (error) {
        console.error('Error al eliminar el evento:', error);
        res.status(400).json({ message: error.message });
    }
};

export default { getEvents, createEvent, updateEvent, deleteEvent };