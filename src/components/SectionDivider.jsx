import React from 'react';

const SectionDivider = ({ variant = 'default' }) => {
  return <div className={`section-divider section-divider--${variant}`} aria-hidden="true" />;
};

export default SectionDivider;
