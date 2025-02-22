import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const ProfileContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.light.background};
  color: ${({ theme }) => theme.colors.light.foreground};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.default};
`;

const InputField = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.light.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
`;

const SaveButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.light.background};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  transition: background-color ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.hover};
  }
`;

const UserProfile = () => {
    const { theme } = useTheme();
    const [userInfo, setUserInfo] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        languagePreference: 'English',
        avatar: 'default-avatar.png'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUserInfo({ ...userInfo, avatar: URL.createObjectURL(file) });
        }
    };

    return (
        <ProfileContainer theme={theme}>
            <h2>User Profile</h2>
            <img src={userInfo.avatar} alt="User Avatar" width="100" />
            <form>
                <label>
                    Name:
                    <InputField 
                        theme={theme}
                        type="text" 
                        name="name" 
                        value={userInfo.name} 
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Email:
                    <InputField 
                        theme={theme}
                        type="email" 
                        name="email" 
                        value={userInfo.email} 
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Language Preference:
                    <select name="languagePreference" value={userInfo.languagePreference} onChange={handleInputChange}>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                    </select>
                </label>
                <label>
                    Avatar:
                    <input type="file" onChange={handleAvatarChange} />
                </label>
            </form>
            <SaveButton theme={theme}>Save Profile</SaveButton>
        </ProfileContainer>
    );
};

export default UserProfile; 