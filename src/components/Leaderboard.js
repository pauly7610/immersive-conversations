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

const AvatarPlaceholder = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing[2]};
  font-size: 14px;
`;

const Leaderboard = () => {
    const { theme } = useTheme();
    const users = [
        { name: 'Alice', score: 150 },
        { name: 'Bob', score: 120 },
        { name: 'Charlie', score: 100 },
    ];

    // Sort users by score
    const sortedUsers = [...users].sort((a, b) => b.score - a.score);

    return (
        <LeaderboardContainer theme={theme}>
            <h2>Leaderboard</h2>
            <ul>
                {sortedUsers.map((user, index) => (
                    <UserItem key={index} theme={theme}>
                        <AvatarPlaceholder theme={theme}>
                            {user.name.charAt(0)}
                        </AvatarPlaceholder>
                        {user.name}: {user.score} points
                    </UserItem>
                ))}
            </ul>
        </LeaderboardContainer>
    );
};

export default Leaderboard; 