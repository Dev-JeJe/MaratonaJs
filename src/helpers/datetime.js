export const secondsToReadableTime = (seconds) => {
    const hoursToExpire = Math.floor(seconds / 60 / 60);
    const minutesToExpire = Math.floor(seconds / 60) - hoursToExpire * 60;
    const secondsToExpire = seconds % 60;

    const formatNumber = v => `0${Number.parseInt(v, 10)}`.slice(-2);
    const readbleTime = [hoursToExpire,minutesToExpire,secondsToExpire].map(formatNumber).join(':');

    return readbleTime;
}