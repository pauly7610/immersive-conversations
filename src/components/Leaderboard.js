import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const LeaderboardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.light.background};
  color: ${({ theme }) => theme.colors.light.foreground};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.default};
`;

const UserItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const Avatar = styled.img`
  border-radius: 50%;
  margin-right: ${({ theme }) => theme.spacing[2]};
`;

const Leaderboard = () => {
    const { theme } = useTheme();
    const users = [
        { name: 'Alice', score: 150, avatar: 'alice.png' },
        { name: 'Bob', score: 120, avatar: 'bob.png' },
        { name: 'Charlie', score: 100, avatar: 'charlie.png' },
    ];

    // Sort users by score
    const sortedUsers = [...users].sort((a, b) => b.score - a.score);

    return (
        <LeaderboardContainer theme={theme}>
            <h2>Leaderboard</h2>
            <ul>
                {sortedUsers.map((user, index) => (
                    <UserItem key={index} theme={theme}>
                        <Avatar src={user.avatar} alt={`${user.name}'s avatar`} width="30" theme={theme} />
                        {user.name}: {user.score} points
                    </UserItem>
                ))}
            </ul>
        </LeaderboardContainer>
    );
};

export default Leaderboard; 