import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';
import { RegisterData } from '../../types/User';
import Shell from '../../components/Shell/Shell';
import './Auth.css';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegisterData>({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        dateOfBirth: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== confirmPassword) {
            setError('Mật khẩu và mật khẩu xác nhận không khớp');
            return;
        }
        try {
            await register(formData);
            alert('Đăng ký thành công! Hãy đăng nhập.');
            navigate('/sign-in'); // Chuyển về trang đăng nhập
        } catch (err) {
            setError('Đăng ký không thành công. Vui lòng thử lại.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <Shell>
            <form onSubmit={handleSubmit} className="auth-form">
                <h1>Đăng ký</h1>
                {error && <p className="error-message">{error}</p>}
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
                    <div className="password-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <span className="eye-icon" onClick={togglePasswordVisibility}>
                            {showPassword ? '🙈' : '👁️'}
                        </span>
                    </div>
                </div>
                <div>
                    <label>Nhập lại mật khẩu</label>
                    <div className="password-container">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                        <span className="eye-icon" onClick={togglePasswordVisibility}>
                            {showConfirmPassword ? '🙈' : '👁️'}
                        </span>
                    </div>
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
                <div className="agreement-container">
                    <p>
                        Bằng cách nhấp vào <strong>Đăng ký</strong>, bạn đồng ý với
                        <a href="/privacy" target="_blank"> Chính sách bảo mật</a> và
                        <a href="/terms" target="_blank"> Điều khoản dịch vụ</a> của chúng tôi.
                    </p>
                </div>
                <button type="submit">Đăng ký</button>

                <div className="switch-container">
                    <p>Đã có tài khoản? <a href="/sign-in">Đăng nhập</a></p>
                </div>
            </form>
        </Shell>
    );
};

export default SignUp;
