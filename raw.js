globalThis.html = String.raw;

export function base64ToObject(base64) {
    return JSON.parse(atob(base64));
}

export function objectToBase64(object) {
    return btoa(JSON.stringify(object));
}
