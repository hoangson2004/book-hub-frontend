import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../../services/authService';
import { User } from '../../types/User';
import Shell from '../../components/Shell/Shell';
import './UserProfile.css';

const UserProfile: React.FC = () => {
    const [userProfile, setUserProfile] = useState<User | null>(null); // Lưu trữ thông tin người dùng
    const [message, setMessage] = useState<string>(''); // Thông báo trạng thái

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

    // Chế độ xem thông tin người dùng
    const renderProfileInfo = () => (
        <div className="user-profile-container">
            <h2>Thông tin người dùng</h2>
            <p><strong>Username:</strong> {userProfile?.username}</p>
            <p><strong>Email:</strong> {userProfile?.email}</p>
            <p><strong>Số điện thoại:</strong> {userProfile?.phoneNumber}</p>
            <p><strong>Ngày sinh:</strong> {new Date(userProfile?.dateOfBirth || '').toLocaleDateString()}</p>
            <p><strong>Role:</strong> {userProfile?.role}</p>
            <p><strong>Ngày tạo tài khoản:</strong> {new Date(userProfile?.createdAt).toLocaleDateString()}</p>
        </div>
    );

    return (
        <Shell>
            <div>
                {message && <div className="message">{message}</div>} {/* Thông báo trạng thái */}
                {userProfile ? renderProfileInfo() : <p className="loading-text">Đang tải thông tin...</p>}
            </div>
        </Shell>
    );
};

export default UserProfile;
