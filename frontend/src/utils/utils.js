export function cropText(str, numChars) {
    const cropped = str.substring(0, numChars);
    if (cropped !== str) {
        return cropped + "...";
    }

    return cropped;
}

export function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}