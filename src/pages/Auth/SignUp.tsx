import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, RegisterData } from '../../services/authService';

const SignUp: React.FC = () => {
    const navigate = useNavigate(); // Để chuyển hướng
    const [formData, setFormData] = useState<RegisterData>({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        dateOfBirth: '',
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(formData);
            alert('Đăng ký thành công! Hãy đăng nhập.');
            navigate('/sign-in'); // Chuyển về trang đăng nhập
        } catch (err) {
            setError('Đăng ký không thành công. Vui lòng thử lại.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Đăng ký</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label>Họ và tên</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Mật khẩu</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Số điện thoại</label>
                <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Ngày sinh</label>
                <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Đăng ký</button>
        </form>
    );
};

export default SignUp;
