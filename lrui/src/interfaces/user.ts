export default interface User {
    username: string;
    password: string;
    email: string;
    phone?: string;
}

export interface AuthStat {
    isLoggedIn: boolean;
    user: User | null;
    pending: boolean;
}
