import React from 'react';
import './NgoCard.css';

const NgoCard = ({ ngo, onJoin }) => {
    return (
        <div className="ngo-card">
            <div className="ngo-card-header">
                <img src={ngo.logo} alt={`${ngo.name} logo`} className="ngo-logo" />
                <h2 className="ngo-name">{ngo.name}</h2>
            </div>
            <div className="ngo-card-body">
                <h3>History</h3>
                <p>{ngo.history}</p>
                <h3>Activities</h3>
                <p>{ngo.activities}</p>
            </div>
            <div className="ngo-card-footer">
                <button className="join-button" onClick={() => onJoin(ngo.id)}>Join</button>
            </div>
        </div>
    );
};

export default NgoCard;