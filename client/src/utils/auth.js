export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export function getToken() {
    if (getTokenDuration() <= 0) {
        return 'EXPIRED';
    }
    return localStorage.getItem('jwt_token');
}

export function setToken(jwt_token) {
    localStorage.setItem('jwt_token', jwt_token);
}