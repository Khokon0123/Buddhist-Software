import React from 'react';
import './StoryDetail.css';

function StoryDetail({ story, onBack, onEdit, onDelete }) {
  return (
    <div className="story-detail-container">
      <div className="story-detail">
        <button className="btn btn-outline back-button" onClick={onBack}>
          ← Back to Stories
        </button>

        {story.imageUrl && (
          <div className="detail-image">
            <img src={story.imageUrl} alt={story.name} />
          </div>
        )}

        <div className="detail-header">
          <h1>{story.name}</h1>
          {story.occupation && (
            <p className="detail-occupation">{story.occupation}</p>
          )}
          {(story.birthDate || story.deathDate) && (
            <p className="detail-dates">
              {story.birthDate && new Date(story.birthDate).getFullYear()}
              {story.birthDate && story.deathDate && ' - '}
              {story.deathDate && new Date(story.deathDate).getFullYear()}
            </p>
          )}
        </div>

        <div className="detail-content">
          <h2>Biography</h2>
          <div className="biography-text">
            {story.biography.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {story.achievements && story.achievements.length > 0 && (
            <>
              <h2>Achievements</h2>
              <ul className="achievements-list">
                {story.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="detail-meta">
          <p>
            <strong>Created:</strong>{' '}
            {new Date(story.createdAt).toLocaleDateString()}
          </p>
          {story.updatedAt !== story.createdAt && (
            <p>
              <strong>Last Updated:</strong>{' '}
              {new Date(story.updatedAt).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="detail-actions">
          <button className="btn btn-secondary" onClick={onEdit}>
            Edit Story
          </button>
          <button className="btn btn-danger" onClick={onDelete}>
            Delete Story
          </button>
        </div>
      </div>
    </div>
  );
}

export default StoryDetail;

