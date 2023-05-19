export function getUUID() {
    const timestamp = new Date().getTime();
    const uuid =
        timestamp.toString() + Math.floor(Math.random() * 10).toString();
    return uuid.substr(-19);
}
