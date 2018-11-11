export function cropText(str, numChars) {
    const cropped = str.substring(0, numChars);
    if (cropped !== str) {
        return cropped + "...";
    }

    return cropped;
}