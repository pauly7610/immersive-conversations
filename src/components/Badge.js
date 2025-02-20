import React from 'react';

const Badge = ({ title, description }) => {
    return (
        <div className="badge" style={{ border: '1px solid #58cc02', borderRadius: '5px', padding: '10px', margin: '5px 0' }}>
            <h3 style={{ color: '#58cc02' }}>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default Badge; 