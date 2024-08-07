"use client"
import { useStore } from '@/components/stateManager/DataStore';
import Image from 'next/image'
import React, {useEffect, useRef, useState} from 'react'

const CallAFriendScreen = () => {
    const setIsCallAFriend = useStore(state => state.setIsCallAFriend);

    const [timeLeft, setTimeLeft] = useState(60);
    const [isTimePlaying, setIsTimePlaying] = useState(false);

    const timeStr = `${timeLeft < 10
        ? "0"
        : ""}${timeLeft}`

    const intervalRef = useRef(null);

    useEffect(() => {
        if (isTimePlaying && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(intervalRef.current);
            setIsCallAFriend(false);
        }

        return() => clearInterval(intervalRef.current);
    }, [isTimePlaying, timeLeft]);

    const startCountdown = () => {
        setIsTimePlaying(true);
    };

    const stopCountdown = () => {
        setIsTimePlaying(false);
        clearInterval(intervalRef.current);
    };

    const restartCountdown = () => {
        setIsTimePlaying(false);
        clearInterval(intervalRef.current);
        setTimeLeft(60)
    };


    return (
        <div className='full flex-col-center gap-5 bg-white/50 px-5 rounded-lg'>
            <h2 className="text-xl font-bold mb-4 text-center text-gray-700">You Have 1 Minute to call a Friend For Help</h2>
            <h1 className="text-5xl font-bold" style={{color: timeLeft > 9 ? "green" : "red"}}>
							{timeStr}
							<span className='text-gray-700'>s</span>
            </h1>
            <div className='flex-row-center gap-5'>
                <button onClick={startCountdown}>
                    <Image
                        src={"/images/icons/others/play-button(1).png"}
                        width={30}
                        height={30}
                        alt='call a friend'
                        className='w-8 h-8'/>
                </button>
                <button onClick={stopCountdown}>
                    <Image
                        src={"/images/icons/others/stop-button(1).png"}
                        width={30}
                        height={30}
                        alt='call a friend'
                        className='w-7 h-7'/>
                </button>
                <button onClick={restartCountdown}>
                    <Image
                        src={"/images/icons/others/undo(1).png"}
                        width={30}
                        height={30}
                        alt='call a friend'
                        className='w-8 h-8'/>
                </button>
            </div>
        </div>
    )
}

export default CallAFriendScreen