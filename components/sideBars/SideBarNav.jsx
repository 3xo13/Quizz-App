import React from 'react'
import ImageWithText from '../global/ImageWithText'
import {v4 as uuidv4} from 'uuid';
import Link from 'next/link';

const placeholderList = [
    {
        title: "Home",
        link: "/",
        iconLink: "/images/icons/home(1).png"
    }, {
        title: "My Games",
        link: "/",
        iconLink: "/images/icons/mygames.png"
    }, {
        title: "Notifications",
        link: "/",
        iconLink: "/images/icons/notification.png"
    }, {
        title: "Game History",
        link: "/",
        iconLink: "/images/icons/history.png"
    }
]

const placeholderList2 = [
	{
		title: "Contact Us",
		link: "/",
		iconLink: "/images/icons/support.png"
	}, {
		title: "FAQ",
		link: "/",
		iconLink: "/images/icons/faq.png"
	}, {
		title: "Logout",
		link: "/",
		iconLink: "/images/icons/logout.png"
	}
]

const SideBarNav = () => {
    const navList = placeholderList.map(
        navItem => <Link key={uuidv4()} href={navItem.link}>
            <div className='w-full h-10 row justify-start items-center gap-3 '>
                <ImageWithText imgSrc={navItem.iconLink} imgSize={"25px"} text={navItem.title}/>
            </div>
        </Link>
    )

	const contactList = placeholderList2.map(
		navItem => <Link key={uuidv4()} href={navItem.link}>
			<div className='w-full h-10 row justify-start items-center gap-3 '>
				<ImageWithText imgSrc={navItem.iconLink} imgSize={"25px"} text={navItem.title} />
			</div>
		</Link>
	)
    return (
        <div className='w-[15dvw] h-screen bg-gray-100 col'>
            {/* header of the sidebarNav */}
            <div className='h-20 w-full flex-col-center '>
                <ImageWithText
                    imgSrc={"/images/placeHolders/logo.svg"}
                    imgSize={"40px"}
                    text={"Quizz App"}/>
            </div>
            {/* navigation list */}
            <div className='w-full h-[60%] col items-start px-5 pt-10 gap-5'>
                {navList}
            </div>
				<div className='w-full col items-start px-5 gap-5'>
					{contactList}
				</div>
        </div>
    )
}

export default SideBarNav