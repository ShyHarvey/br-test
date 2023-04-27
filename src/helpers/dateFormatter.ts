export const dateFormatter = (time: number) => {
    const timeFormat = new Date(time * 1000);
    const displayDate = `${timeFormat.getDate()}.${timeFormat.getMonth() + 1}.${timeFormat.getFullYear()}`;
    return displayDate
}