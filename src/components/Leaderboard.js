import React from 'react';

const Leaderboard = () => {
    const users = [
        { name: 'Alice', score: 150, avatar: 'alice.png' },
        { name: 'Bob', score: 120, avatar: 'bob.png' },
        { name: 'Charlie', score: 100, avatar: 'charlie.png' },
    ];

    // Sort users by score
    const sortedUsers = [...users].sort((a, b) => b.score - a.score);

    return (
        <div>
            <h2>Leaderboard</h2>
            <ul>
                {sortedUsers.map((user, index) => (
                    <li key={index}>
                        <img src={user.avatar} alt={`${user.name}'s avatar`} width="30" />
                        {user.name}: {user.score} points
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard; 