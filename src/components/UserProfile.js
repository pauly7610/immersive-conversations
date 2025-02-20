import React, { useState } from 'react';

const UserProfile = () => {
    const [userInfo, setUserInfo] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        languagePreference: 'English',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    return (
        <div>
            <h2>User Profile</h2>
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
            </form>
        </div>
    );
};

export default UserProfile; 