export function formatTime(arg: string) {
    let min = (Math.floor(Number(arg) / 60)).toString();
    let sec = (Number(arg) - (Number(min) * 60)).toString();

    if (Number(min) < 10) min = '0' + min;
    if (Number(sec) < 10) sec = '0' + sec;
    
    const time = `${min}:${sec}`;
    return time;
}