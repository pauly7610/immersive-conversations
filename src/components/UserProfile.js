import React, { useState } from 'react';

const UserProfile = () => {
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
        <div>
            <h2>User Profile</h2>
            <img src={userInfo.avatar} alt="User Avatar" width="100" />
            <form>
                <label>
                    Name:
                    <input type="text" name="name" value={userInfo.name} onChange={handleInputChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={userInfo.email} onChange={handleInputChange} />
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
        </div>
    );
};

export default UserProfile; 