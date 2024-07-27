import React from 'react'
import ImageWithText from '../global/ImageWithText'
import {v4 as uuidv4} from 'uuid';
import Link from 'next/link';
import Image from 'next/image';

const usersListPlaceholder = [
    1,
    2,
    3,
    4,
    5,
    6
]

const SideBarInfo = () => {

    const users = usersListPlaceholder.map(
        user => <Image
            key={uuidv4()}
            src={"/images/placeHolders/user.png"}
            width={50}
            height={50}
            alt='user profile image'
            className=""
            style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%"
            }}/>
    )

    return (
        <div className='w-[15dvw] h-screen bg-gray-100 col'>
            {/* friends */}
            <div className=' p-3'>
                <div className=''>
                    <h3 className='gradientText'>Friends</h3>
                </div>
                <div className='grid-cols-3 grid-rows-2 grid gap-5 p-3'>
                    {users}
                </div>
            </div>
            <div className=' p-3'>
                <div className=''>
                    <h3 className='gradientText'>Achievements</h3>
                </div>
                <div className='grid-cols-3 grid-rows-auto grid gap-5 p-3'>
                    {users.slice(3)}
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default SideBarInfo