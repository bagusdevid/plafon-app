import {Times} from "@/Components/CountDown/Times.jsx";
import {useEffect, useRef, useState} from "react";

export {Times}

export default function CountDown() {
    // const [hours, setHours] = useState(initialHours);
    // const [minutes, setMinutes] = useState(initialMinutes);
    // const [seconds, setSeconds] = useState(initialSeconds);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(31);
    const [seconds, setSeconds] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds > 0) {
                    return prevSeconds - 1;
                } else {
                    setMinutes((prevMinutes) => {
                        if (prevMinutes > 0) {
                            setSeconds(59);
                            return prevMinutes - 1;
                        } else {
                            setHours((prevHours) => {
                                if (prevHours > 0) {
                                    setMinutes(59);
                                    setSeconds(59);
                                    return prevHours - 1;
                                } else {
                                    clearInterval(timerRef.current);
                                    return 0;
                                }
                            });
                            return prevMinutes;
                        }
                    });
                    return prevSeconds;
                }
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, []);

    return (
        <div>
            <span>{String(hours).padStart(2, '0')}</span>:
            <span>{String(minutes).padStart(2, '0')}</span>:
            <span>{String(seconds).padStart(2, '0')}</span>
        </div>
    );
}
