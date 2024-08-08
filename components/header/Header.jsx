import Image from 'next/image'
import React from 'react'
import ImageWithText from '../global/ImageWithText'
import Link from 'next/link'

const Header = () => {
    return (
        <div className='w-[70dvw] h-20 flex-row-center p-5 '>
            {/* search bar */}
            {/* <div className='w-2/3'>
                <form>
                    <div className='row items-center bg-white rounded-full'>
                        <input
                            type="text"
                            className='border-none bg-transparent w-11/12 focus:outline-none px-3 py-1 textBlack'/>
                        <div className='w-1/12 flex-row-center'>
                            <Image
                                src={"/images/icons/search.png"}
                                width={50}
                                height={50}
                                alt='user profile image'
                                className='w-4 h-4 '/>

                        </div>
                    </div>
                </form>
            </div> */}
            {/* user */}
            <div className='w-1/3'>
            <Link href={"/profile"} >
                <ImageWithText
                    imgSrc={"/images/placeHolders/user.png"}
                    imgSize={"40px"}
                    text={"User Name"}
					imgRadius={"50%"}/>
            </Link>
            </div>
        </div>
    )
}

export default Header