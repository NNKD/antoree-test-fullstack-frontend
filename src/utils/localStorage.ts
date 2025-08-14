export function saveToken(token: string) {
    localStorage.setItem('tokens', token);
}

export function removeToken() {
    localStorage.removeItem('tokens');
}

export function getToken() {
    return localStorage.getItem('tokens');
}

export function saveUserId(id: string) {
    localStorage.setItem('id', id);
}

export function getUserId() {
    return localStorage.getItem('id');
}

export function removeUserId() {
    localStorage.removeItem('id');
}