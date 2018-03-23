import React, { Component } from 'react';

const SortDropdown = ({ options, sortMedia, hidden, toggleHidden, sortField }) => {
  const formattedType = sortField.toLowerCase();
  const dropdownClass = `dropdown ${ !hidden ? 'dropdown-active' : ''}`;

  let key = 0;
  const sortOptions = options.map((option) => {
    key++;
    return(
      <p key={key} onClick={() => sortMedia(formattedType, option.value)}>{option.display}</p>
    );
  });

  return(
    <li className={dropdownClass} onClick={() => toggleHidden(sortField, hidden)}>
      <p className="option">By {sortField}</p>
      <div className="dropdown-content">
        {sortOptions}
      </div>
    </li>
  );
};

export default SortDropdown;
