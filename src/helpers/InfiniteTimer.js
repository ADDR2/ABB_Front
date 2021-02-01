function infiniteTimer(timer = null, time = 1000, syncCallback = () => {}) {
    timer && clearTimeout(timer);
    timer = setTimeout(
        () => {
            syncCallback();
            infiniteTimer(timer, time, syncCallback);
        },
        time
    );
}

export default infiniteTimer;