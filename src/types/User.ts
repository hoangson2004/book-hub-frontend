export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData extends LoginData {
    username: string;
    phoneNumber: string;
    dateOfBirth: string;
}

export interface LoginResponse {
    token: string;
    user: {
        id: string;
        username: string;
        role: string;
    };
}

export interface User {
    _id: string;
    username: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    role: string;
    createdAt: string;
    __v: number;
}

export interface UpdateProfile {
    phoneNumber: string;
    dateOfBirth: string;
    password?: string;
    email: string;
}
