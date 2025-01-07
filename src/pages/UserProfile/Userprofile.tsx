import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../../services/authService';
import { User } from '../../types/User';
import Shell from '../../components/Shell/Shell';
import './UserProfile.css';

const UserProfile: React.FC = () => {
    const [userProfile, setUserProfile] = useState<User | null>(null);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profile = await getUserProfile();
                setUserProfile(profile);
            } catch (error) {
                setMessage('Lỗi khi tải thông tin người dùng.');
            }
        };

        fetchUserProfile();
    }, []);

    const renderProfileInfo = () => (
        <div className="user-profile-container">
            <h2>Thông tin người dùng</h2>
            <p><strong>Username:</strong> {userProfile?.username}</p>
            <p><strong>Email:</strong> {userProfile?.email}</p>
            <p><strong>Số điện thoại:</strong> {userProfile?.phoneNumber}</p>
            <p><strong>Ngày sinh:</strong> {new Date(userProfile?.dateOfBirth || '').toLocaleDateString()}</p>
            <p><strong>Role:</strong> {userProfile?.role}</p>
            <p><strong>Ngày tạo tài khoản:</strong> {new Date(userProfile?.createdAt || '').toLocaleDateString()}</p>
            <div className="update-button-container">
                <button className="update-button">Cập nhật thông tin</button>
            </div>

        </div>
    );

    return (
        <Shell>
            <div>
                {message && <div className="message">{message}</div>}
                {userProfile ? renderProfileInfo() : <p className="loading-text">Đang tải thông tin...</p>}
            </div>
        </Shell>
    );
};

export default UserProfile;
