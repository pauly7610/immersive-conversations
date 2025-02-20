import React from 'react';

const Badge = ({ title, description, icon }) => {
    return (
        <div className="badge" style={{ border: '1px solid #58cc02', borderRadius: '5px', padding: '10px', margin: '5px 0', display: 'flex', alignItems: 'center' }}>
            {icon && <img src={icon} alt={`${title} icon`} style={{ marginRight: '10px', width: '30px' }} />}
            <div>
                <h3 style={{ color: '#58cc02', margin: '0' }}>{title}</h3>
                <p style={{ margin: '0' }}>{description}</p>
            </div>
        </div>
    );
};

export default Badge; 