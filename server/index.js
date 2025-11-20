const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data', 'stories.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
  
  // Initialize empty array if file doesn't exist
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
  }
}

// Read stories from file
async function readStories() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading stories:', error);
    return [];
  }
}

// Write stories to file
async function writeStories(stories) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(stories, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing stories:', error);
    return false;
  }
}

// Routes

// Get all stories
app.get('/api/stories', async (req, res) => {
  try {
    const stories = await readStories();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

// Get a single story by ID
app.get('/api/stories/:id', async (req, res) => {
  try {
    const stories = await readStories();
    const story = stories.find(s => s.id === req.params.id);
    
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    
    res.json(story);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch story' });
  }
});

// Create a new story
app.post('/api/stories', async (req, res) => {
  try {
    const { name, birthDate, deathDate, occupation, biography, achievements, imageUrl } = req.body;
    
    if (!name || !biography) {
      return res.status(400).json({ error: 'Name and biography are required' });
    }
    
    const stories = await readStories();
    const newStory = {
      id: uuidv4(),
      name,
      birthDate: birthDate || null,
      deathDate: deathDate || null,
      occupation: occupation || '',
      biography,
      achievements: achievements || [],
      imageUrl: imageUrl || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    stories.push(newStory);
    await writeStories(stories);
    
    res.status(201).json(newStory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create story' });
  }
});

// Update a story
app.put('/api/stories/:id', async (req, res) => {
  try {
    const stories = await readStories();
    const index = stories.findIndex(s => s.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Story not found' });
    }
    
    const { name, birthDate, deathDate, occupation, biography, achievements, imageUrl } = req.body;
    
    stories[index] = {
      ...stories[index],
      name: name || stories[index].name,
      birthDate: birthDate !== undefined ? birthDate : stories[index].birthDate,
      deathDate: deathDate !== undefined ? deathDate : stories[index].deathDate,
      occupation: occupation !== undefined ? occupation : stories[index].occupation,
      biography: biography || stories[index].biography,
      achievements: achievements !== undefined ? achievements : stories[index].achievements,
      imageUrl: imageUrl !== undefined ? imageUrl : stories[index].imageUrl,
      updatedAt: new Date().toISOString()
    };
    
    await writeStories(stories);
    res.json(stories[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update story' });
  }
});

// Delete a story
app.delete('/api/stories/:id', async (req, res) => {
  try {
    const stories = await readStories();
    const filteredStories = stories.filter(s => s.id !== req.params.id);
    
    if (stories.length === filteredStories.length) {
      return res.status(404).json({ error: 'Story not found' });
    }
    
    await writeStories(filteredStories);
    res.json({ message: 'Story deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete story' });
  }
});

// Search stories
app.get('/api/stories/search/:query', async (req, res) => {
  try {
    const stories = await readStories();
    const query = req.params.query.toLowerCase();
    
    const filteredStories = stories.filter(story => 
      story.name.toLowerCase().includes(query) ||
      story.occupation.toLowerCase().includes(query) ||
      story.biography.toLowerCase().includes(query)
    );
    
    res.json(filteredStories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search stories' });
  }
});

// Initialize and start server
async function startServer() {
  await ensureDataDirectory();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();

