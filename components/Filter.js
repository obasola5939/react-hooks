import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Filter = ({ onFilterChange, titleFilter, ratingFilter }) => {
  const [localTitle, setLocalTitle] = useState(titleFilter);
  const [localRating, setLocalRating] = useState(ratingFilter);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setLocalTitle(value);
    onFilterChange('title', value);
  };

  const handleRatingChange = (e) => {
    const value = parseFloat(e.target.value);
    setLocalRating(value);
    onFilterChange('rating', value);
  };

  const handleReset = () => {
    setLocalTitle('');
    setLocalRating(0);
    onFilterChange('title', '');
    onFilterChange('rating', 0);
  };

  return (
    <div className="filter-container">
      <h2 className="filter-title">🔍 Filter Movies</h2>
      
      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="title-filter" className="filter-label">
            Search by Title:
          </label>
          <input
            id="title-filter"
            type="text"
            placeholder="Type movie title..."
            value={localTitle}
            onChange={handleTitleChange}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="rating-filter" className="filter-label">
            Minimum Rating: <span className="rating-value">{localRating}/10</span>
          </label>
          <div className="rating-slider-container">
            <input
              id="rating-filter"
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={localRating}
              onChange={handleRatingChange}
              className="rating-slider"
            />
            <div className="rating-labels">
              <span>0</span>
              <span>2</span>
              <span>4</span>
              <span>6</span>
              <span>8</span>
              <span>10</span>
            </div>
          </div>
        </div>

        <button 
          onClick={handleReset} 
          className="reset-btn"
          disabled={!localTitle && localRating === 0}
        >
          Clear Filters
        </button>
      </div>

      <div className="filter-summary">
        {localTitle && <span className="filter-tag">Title: "{localTitle}"</span>}
        {localRating > 0 && <span className="filter-tag">Rating: {localRating}+</span>}
        {!localTitle && localRating === 0 && (
          <span className="filter-tag">No filters applied</span>
        )}
      </div>
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  titleFilter: PropTypes.string,
  ratingFilter: PropTypes.number
};

Filter.defaultProps = {
  titleFilter: '',
  ratingFilter: 0
};

export default Filter;
