export function saveToken(token: string) {
    localStorage.setItem('tokens', JSON.stringify(token));
}

export function removeToken() {
    localStorage.removeItem('tokens');
}