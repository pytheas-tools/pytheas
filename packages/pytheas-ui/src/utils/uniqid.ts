function now(): number {
    const time = Date.now();
    const last = now.last || time;
    return (now.last = time > last ? time : last + 1);
}
export function uniqId() {
    return now().toString(36);
}
