import React from 'react';

const Leaderboard = () => {
    const users = [
        { name: 'Alice', score: 150 },
        { name: 'Bob', score: 120 },
        { name: 'Charlie', score: 100 },
    ];

    return (
        <div>
            <h2>Leaderboard</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user.name}: {user.score} points</li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard; 