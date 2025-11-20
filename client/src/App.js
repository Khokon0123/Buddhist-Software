import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import StoryList from './components/StoryList';
import StoryForm from './components/StoryForm';
import StoryDetail from './components/StoryDetail';
import SearchBar from './components/SearchBar';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchStories();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredStories(stories);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = stories.filter(story =>
        story.name.toLowerCase().includes(query) ||
        story.occupation.toLowerCase().includes(query) ||
        story.biography.toLowerCase().includes(query)
      );
      setFilteredStories(filtered);
    }
  }, [searchQuery, stories]);

  const fetchStories = async () => {
    try {
      const response = await axios.get(`${API_URL}/stories`);
      setStories(response.data);
      setFilteredStories(response.data);
    } catch (error) {
      console.error('Error fetching stories:', error);
      alert('Failed to load stories. Make sure the server is running.');
    }
  };

  const handleCreateStory = async (storyData) => {
    try {
      const response = await axios.post(`${API_URL}/stories`, storyData);
      setStories([...stories, response.data]);
      setShowForm(false);
      alert('Story created successfully!');
    } catch (error) {
      console.error('Error creating story:', error);
      alert('Failed to create story');
    }
  };

  const handleUpdateStory = async (id, storyData) => {
    try {
      const response = await axios.put(`${API_URL}/stories/${id}`, storyData);
      setStories(stories.map(s => s.id === id ? response.data : s));
      setEditingStory(null);
      setSelectedStory(response.data);
      alert('Story updated successfully!');
    } catch (error) {
      console.error('Error updating story:', error);
      alert('Failed to update story');
    }
  };

  const handleDeleteStory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this story?')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/stories/${id}`);
      setStories(stories.filter(s => s.id !== id));
      if (selectedStory?.id === id) {
        setSelectedStory(null);
      }
      alert('Story deleted successfully!');
    } catch (error) {
      console.error('Error deleting story:', error);
      alert('Failed to delete story');
    }
  };

  const handleEditClick = (story) => {
    setEditingStory(story);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingStory(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>📚 Life Stories</h1>
        <p>Preserve the stories of remarkable people</p>
      </header>

      <main className="app-main">
        {!showForm && !selectedStory && (
          <>
            <div className="controls">
              <SearchBar 
                searchQuery={searchQuery} 
                onSearchChange={setSearchQuery} 
              />
              <button 
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
              >
                + Add New Story
              </button>
            </div>
            <StoryList
              stories={filteredStories}
              onStoryClick={setSelectedStory}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteStory}
            />
          </>
        )}

        {showForm && (
          <StoryForm
            story={editingStory}
            onSubmit={editingStory 
              ? (data) => handleUpdateStory(editingStory.id, data)
              : handleCreateStory
            }
            onCancel={handleCancelForm}
          />
        )}

        {selectedStory && !showForm && (
          <StoryDetail
            story={selectedStory}
            onBack={() => setSelectedStory(null)}
            onEdit={() => handleEditClick(selectedStory)}
            onDelete={() => handleDeleteStory(selectedStory.id)}
          />
        )}
      </main>
    </div>
  );
}

export default App;

