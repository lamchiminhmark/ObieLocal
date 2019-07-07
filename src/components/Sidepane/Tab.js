/** Presentational component */

import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/tabs.css';

const Tab = props => {
  const onClick = () => {
    const { label, onClick } = props;
    onClick(label);
  };

  const { activeTab, label } = props;

  let className = 'tab-list-item';

  if (activeTab === label) {
    className += ' tab-list-active';
  }

  return (
    <li className={className} onClick={onClick}>
      {label}
    </li>
  );
};

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Tab;
