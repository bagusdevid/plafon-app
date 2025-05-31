import {useEffect, useState} from "react";

export function Times({minutes, sess}) {
    const [initialTime, setInitialTime] = useState(null)
    const [timeRemaining, setTimeRemaining] = useState(0);

    function addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    }

    const initTime = () => {
        if(initialTime) {
            return initialTime;
        } else {
            setInitialTime(addMinutes(new Date(), minutes).getTime())
            return addMinutes(new Date(), minutes).getTime()
        }
    }

    useEffect(() => {
            const countdownInterval = setInterval(() => {
                const currentTime = new Date().getTime();
                const eventTime = initTime()
                let remainingTime = eventTime - currentTime;

                if (remainingTime <= 0) {
                    // remainingTime = eventTime - currentTime;
                    // setInitialTime(addMinutes(new Date(), minutes).getTime())
                    sess.setTaskSession(true)
                    // remainingTime = 0;
                    // clearInterval(countdownInterval);
                    // alert("Countdown complete!");
                }

                setTimeRemaining(remainingTime);
            }, 10);

            return () => clearInterval(countdownInterval);
    }, [timeRemaining]);

    useEffect(() => {
        if(sess.taskSession) {
            setInitialTime(addMinutes(new Date(), minutes).getTime())
        }
    }, [sess.taskSession])

    const formatTime = (time) => {
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / (1000 * 60)) % 60);
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

        return (
            <div className="flex text-[24px] font-semibold text-red-500">
                <div>{hours.toString().padStart(2, "0")}</div>
                <div>:</div>
                <div>{minutes.toString().padStart(2, "0")}</div>
                <div>:</div>
                <div>{seconds.toString().padStart(2, "0")}</div>
            </div>
        );
    }

    return <>
        {formatTime(timeRemaining)}
    </>
}
