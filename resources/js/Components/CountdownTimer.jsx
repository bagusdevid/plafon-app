import {useEffect, useState} from "react";

export default function CountdownTimer() {
    const [eventName, setEventName] = useState("My event");
    const [eventDate, setEventDate] = useState("2025-05-25");
    const [countdownStarted, setCountdownStarted] = useState(true);
    const [timeRemaining, setTimeRemaining] = useState(0);

    useEffect(() => {
        if (countdownStarted && eventDate) {
            const countdownInterval = setInterval(() => {
                const currentTime = new Date().getTime();
                const eventTime = new Date(eventDate).getTime();
                let remainingTime = eventTime - currentTime;

                if (remainingTime <= 0) {
                    remainingTime = 0;
                    clearInterval(countdownInterval);
                    alert("Countdown complete!");
                }

                setTimeRemaining(remainingTime);
            }, 1000);

            return () => clearInterval(countdownInterval);
        }
    }, [countdownStarted, eventDate, timeRemaining]);

    // useEffect(() => {
    //     if (countdownStarted) {
    //         document.title = eventName;
    //     }
    // }, [countdownStarted, eventName]);

    const handleSetCountdown = () => {
        setCountdownStarted(true);
        // console.log(eventDate)
        localStorage.setItem("eventDate", eventDate);
        localStorage.setItem("eventName", eventName);
    };

    const handleStopCountdown = () => {
        setCountdownStarted(false);
        setTimeRemaining(0);
    };

    const handleResetCountdown = () => {
        setCountdownStarted(false);
        setEventDate("");
        setEventName("");
        setTimeRemaining(0);
        localStorage.removeItem("eventDate");
        localStorage.removeItem("eventName");
    };

    const formatDate = (date) => {
        const options = { month: "long", day: "numeric", year: "numeric" };
        return new Date(date).toLocaleDateString("en-US", options);
    };

    const formatTime = (time) => {
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / (1000 * 60)) % 60);
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const days = Math.floor(time / (1000 * 60 * 60 * 24));

        return (
            <div className="countdown-display mb-5 mt-5 flex justify-around">
                <div className="countdown-value text-center bg-white rounded-md px-1 pt-2 w-[43px]">
                    <div className="text-[25px] leading-5 font-bold">{days.toString().padStart(2, "0")}</div>
                    <div className="text-[12px] text-gray-400">days</div>
                </div>
                <div className="countdown-value text-center bg-white rounded-md px-1 pt-2 w-[43px]">
                    <div className="text-[25px] leading-5 font-bold">{hours.toString().padStart(2, "0")}</div>
                    <div className="text-[12px] text-gray-400">hours</div>
                </div>
                <div className="countdown-value text-center bg-white rounded-md px-1 pt-2 w-[43px]">
                    <div className="text-[25px] leading-5 font-bold">{minutes.toString().padStart(2, "0")}</div>
                    <div className="text-[12px] text-gray-400">min</div>
                </div>
                <div className="countdown-value text-center bg-white rounded-md px-1 pt-2 w-[43px]">
                    <div className="text-[25px] leading-5 font-bold">{seconds.toString().padStart(2, "0")}</div>
                    <div className="text-[12px] text-gray-400">sec</div>
                </div>
            </div>
        );
    };

    return (
        <div className="countdown-timer-container">
            {/*<h2 className="countdown-name">*/}
            {/*    {countdownStarted ? eventName : "Countdown Timer"}*/}
            {/*</h2>*/}
            {/*<p className="countdown-date">*/}
            {/*    {countdownStarted && formatDate(eventDate)}*/}
            {/*</p>*/}

            {!countdownStarted ? (
                <form className="countdown-form">
                    <label htmlFor="title">Event Name</label>
                    <input
                        name="title"
                        type="text"
                        placeholder="Enter event name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                    />

                    <label htmlFor="date-picker">Event Date</label>
                    <input
                        name="date-picker"
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        onClick={(e) => (e.target.type = "date")}
                    />
                    <button onClick={handleSetCountdown}>Start Countdown</button>
                </form>
            ) : (
                <>
                    {formatTime(timeRemaining)}
                    {/*<div className="control-buttons">*/}
                    {/*    <button onClick={handleStopCountdown}>Stop</button>*/}
                    {/*    <button onClick={handleResetCountdown}>Reset</button>*/}
                    {/*</div>*/}
                </>
            )}
        </div>
    );
}
