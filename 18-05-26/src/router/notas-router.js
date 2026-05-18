const express = require('express');
const router = express.Router();
const noteService = require('../services/notaService');

router.get('/', (req, res) => {
    res.json(noteService.readAll());
});

router.post('/', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }
    const newNote = noteService.create(title, content);
    res.status(201).json(newNote);
});



router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedNote = noteService.update(id, title, content);
    
    if (!updatedNote) {
        return res.status(404).json({ error: 'Note not found' });
    }
    res.json(updatedNote);
});



router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const deleted = noteService.deleteNote(id);
    
    if (!deleted) {
        return res.status(404).json({ error: 'Note not found' });
    }
    res.status(204).send();
});

module.exports = router;
