import React, { useState, useEffect } from 'react';
import './StoryForm.css';

function StoryForm({ story, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    deathDate: '',
    occupation: '',
    biography: '',
    achievements: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (story) {
      setFormData({
        name: story.name || '',
        birthDate: story.birthDate ? story.birthDate.split('T')[0] : '',
        deathDate: story.deathDate ? story.deathDate.split('T')[0] : '',
        occupation: story.occupation || '',
        biography: story.biography || '',
        achievements: Array.isArray(story.achievements) 
          ? story.achievements.join('\n') 
          : '',
        imageUrl: story.imageUrl || ''
      });
    }
  }, [story]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.biography.trim()) {
      alert('Name and biography are required');
      return;
    }

    const achievementsArray = formData.achievements
      .split('\n')
      .map(a => a.trim())
      .filter(a => a.length > 0);

    const submitData = {
      ...formData,
      achievements: achievementsArray,
      birthDate: formData.birthDate || null,
      deathDate: formData.deathDate || null
    };

    onSubmit(submitData);
  };

  return (
    <div className="story-form-container">
      <div className="story-form">
        <h2>{story ? 'Edit Story' : 'Add New Story'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter full name"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="birthDate">Birth Date</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="deathDate">Death Date</label>
              <input
                type="date"
                id="deathDate"
                name="deathDate"
                value={formData.deathDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="occupation">Occupation/Title</label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="e.g., Scientist, Artist, Leader"
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="biography">Biography *</label>
            <textarea
              id="biography"
              name="biography"
              value={formData.biography}
              onChange={handleChange}
              required
              rows="8"
              placeholder="Write the life story here..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="achievements">Achievements (one per line)</label>
            <textarea
              id="achievements"
              name="achievements"
              value={formData.achievements}
              onChange={handleChange}
              rows="4"
              placeholder="List major achievements, one per line"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {story ? 'Update Story' : 'Create Story'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StoryForm;

