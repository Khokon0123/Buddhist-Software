import React from 'react';
import './StoryList.css';

function StoryList({ stories, onStoryClick, onEditClick, onDeleteClick }) {
  if (stories.length === 0) {
    return (
      <div className="empty-state">
        <h2>No stories yet</h2>
        <p>Start by adding a life story of someone remarkable!</p>
      </div>
    );
  }

  return (
    <div className="story-list">
      {stories.map(story => (
        <div key={story.id} className="story-card">
          {story.imageUrl && (
            <div className="story-image">
              <img src={story.imageUrl} alt={story.name} />
            </div>
          )}
          <div className="story-content">
            <h2>{story.name}</h2>
            {story.occupation && (
              <p className="occupation">{story.occupation}</p>
            )}
            {(story.birthDate || story.deathDate) && (
              <p className="dates">
                {story.birthDate && new Date(story.birthDate).getFullYear()}
                {story.birthDate && story.deathDate && ' - '}
                {story.deathDate && new Date(story.deathDate).getFullYear()}
              </p>
            )}
            <p className="biography-preview">
              {story.biography.length > 200
                ? `${story.biography.substring(0, 200)}...`
                : story.biography}
            </p>
            <div className="story-actions">
              <button
                className="btn btn-secondary"
                onClick={() => onStoryClick(story)}
              >
                Read More
              </button>
              <button
                className="btn btn-outline"
                onClick={() => onEditClick(story)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => onDeleteClick(story.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StoryList;

