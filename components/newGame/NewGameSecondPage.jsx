import Image from 'next/image'
import React from 'react'
import {v4 as uuidv4} from 'uuid'
import HomeQuizzCard from '../quizz/HomeQuizzCard'

// temporary placeholder
const choosenQuizList = [
    {
        "id": "RLSZM0fM3LiLHjd96w2J",
        "quizz": {
            "image": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/quiz" +
                    "zImages%2Fab47da23-9468-4ed8-a7d5-64536076bda4.jpg?alt=media&token=11408f17-fa" +
                    "60-40aa-b90e-147dacb6ee3c",
            "questions": [
                {
                    "points": "200",
                    "level": "easy",
                    "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                            "tionsFiles%2F88ed8ece-a2b8-4fd3-8220-5a880d43ae01.mp3?alt=media&token=ba070b50" +
                            "-aae8-4964-b606-7ba34ffe0ec2",
                    "answer": "1964",
                    "type": "audio",
                    "question": "what year did the Beatles first go to the USA? "
                }, {
                    "type": "audio",
                    "points": "200",
                    "answer": "Noddy Holder",
                    "question": "Who was the lead singer of the 1970s pop group Slade? ",
                    "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                            "tionsFiles%2Fbd82dc87-2f4f-4e51-b5da-69efc9611e83.mp3?alt=media&token=7746081a" +
                            "-eade-4c68-b2d6-c5e20d7df644",
                    "level": "easy"
                }, {
                    "type": "audio",
                    "level": "medium",
                    "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                            "tionsFiles%2F3b62ee08-2a2e-4292-ab4d-0ce1b73cee0a.mp3?alt=media&token=1011bd96" +
                            "-c25f-4d92-9816-236bd5178abc",
                    "answer": "Hometown glory",
                    "points": "400",
                    "question": "What was Adele's first record called? "
                }, {
                    "answer": "Dua Lipa",
                    "level": "medium",
                    "question": "'Future Nostalgia' containing the single 'Don't Start Now' is the second studi" +
                            "o album from which English singer? ",
                    "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                            "tionsFiles%2F84ea2fbf-3823-4093-82e6-8a94d201295d.mp3?alt=media&token=4a514284" +
                            "-f625-4302-ac9d-19315718ebce",
                    "points": "400",
                    "type": "audio"
                }, {
                    "question": "What is the name of the band with the following members: John Deacon, Brian Ma" +
                            "y, Freddie Mercury, Roger Taylor? ",
                    "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                            "tionsFiles%2Fdfd46aa2-3b4f-4246-94d1-dc94dad6d979.mp3?alt=media&token=db497261" +
                            "-fefa-4818-896a-b4ea3568a04a",
                    "answer": "Queen",
                    "points": "800",
                    "level": "hard",
                    "type": "audio"
                }, {
                    "question": "Which singer was known amongst other things as 'The King of Pop' and 'The Glov" +
                            "ed One'? ",
                    "answer": "Michael Jackson",
                    "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                            "tionsFiles%2Feb9f5692-7b40-446c-95b8-e2498dc4d6c7.mp3?alt=media&token=49132425" +
                            "-ef03-45a3-a0f0-95603709d92d",
                    "level": "hard",
                    "points": "800",
                    "type": "audio"
                }
            ],
            "title": "Music"
        }
    }, {
        "id": "L7Q51GPJ7oAl1l0jYN4e",
        "quizz": {
            "image": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/quiz" +
                    "zImages%2Fd4178dea-a3f8-4f3c-8a6f-70e8bbd6931f.jpg?alt=media&token=626d3808-62" +
                    "b4-4c77-a784-56cd740692e7",
            "questions": [
                {
                    "type": "image",
                    "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                            "tionsFiles%2F75dede5b-aa12-4149-b7de-2fbdc4252b5e.jpg?alt=media&token=a17bc770" +
                            "-1eb3-4c6f-b9ed-30f7acb09296",
                    "question": "Name this Animal",
                    "answer": "African Lion",
                    "level": "hard",
                    "points": "200"
                }, {
                    "points": "200",
                    "answer": "African Elephant",
                    "type": "image",
                    "level": "hard",
                    "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                            "tionsFiles%2Fd9b12cfc-7568-4a59-892b-f4ab6815a69f.jpg?alt=media&token=44bcf0d2" +
                            "-b1ad-4de8-ac2e-073f42ca76e0",
                    "question": "Name this Animal"
                }, {
                    "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                            "tionsFiles%2Ff5c62f6b-3962-46a8-b63c-bd0471a29ded.jpg?alt=media&token=5f62bb43" +
                            "-c4ea-45d1-98d4-5e670eef390a",
                    "type": "image",
                    "question": "Name this Animal",
                    "answer": "African Penguin",
                    "points": "500",
                    "level": "medium"
                }, {
                    "answer": "African Buffalo",
                    "question": "Name this Animal",
                    "type": "image",
                    "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                            "tionsFiles%2F1c260390-538d-4a60-b395-4bffed5fb81d.png?alt=media&token=c0260344" +
                            "-e5e1-4d3b-9f90-543c528aa0eb",
                    "points": "500",
                    "level": "medium"
                }, {
                    "level": "hard",
                    "points": "800",
                    "type": "image",
                    "question": "Name this Animal",
                    "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                            "tionsFiles%2Fe75ab9df-dec4-4478-a4b6-bff886ee1746.jpeg?alt=media&token=489a81e" +
                            "9-5f66-454b-9efd-fb9ee30c2016",
                    "answer": "Arrd wolf"
                }, {
                    "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                            "tionsFiles%2Fbef49db8-adc9-4a2e-a5b8-0da6019cb3e2.jpg?alt=media&token=0c748b96" +
                            "-5d12-4ed9-a994-6afbabbb255d",
                    "answer": "Addax",
                    "level": "hard",
                    "type": "image",
                    "question": "Name this Animal",
                    "points": "800"
                }
            ],
            "title": "Animals"
        }
    }, {
        "id": "5U81ra5GZgyLfQuOUYfD",
        "quizz": {
            "image": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/quiz" +
                    "zImages%2F486b50a3-cad6-4b35-b3e6-9729353a62cc.jpg?alt=media&token=8b9245aa-94" +
                    "66-4845-9106-8c64f8c78e4a",
            "questions": [
                {
                    "question": "Where does the American baseball team the Tampa Bay Rays play their home games" +
                            "?",
                    "type": "text",
                    "media": null,
                    "points": "800",
                    "level": "hard",
                    "answer": "Tropicana Field"
                }, {
                    "type": "text",
                    "question": "First held in 1907, in which sport is the Waterloo Cup contested?",
                    "points": "800",
                    "media": null,
                    "level": "hard",
                    "answer": "Crown Green Bowls"
                }, {
                    "level": "medium",
                    "question": "Who was the BBC’s ‘Sports Personality of the Year’ in 2001? ",
                    "media": null,
                    "type": "text",
                    "points": "500",
                    "answer": "David Beckham"
                }, {
                    "media": null,
                    "answer": "Hamilton, Canada",
                    "level": "medium",
                    "type": "text",
                    "question": "Where were the Commonwealth Games held in 1930? ",
                    "points": "500"
                }, {
                    "points": "200",
                    "answer": "Seven",
                    "level": "easy",
                    "question": "How many players are there in a Water Polo team? ",
                    "type": "text",
                    "media": null
                }, {
                    "type": "text",
                    "points": "200",
                    "answer": "Judo",
                    "media": null,
                    "question": "What sport did Neil Adams excel in? ",
                    "level": "easy"
                }
            ],
            "title": "Sports"
        }
    }, {
        "id": "uCMhjIYdrMnOsXs3J056",
        "quizz": {
            "title": "Cartoon Characters",
            "image": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/quiz" +
                    "zImages%2F9159d36a-452e-409d-be11-c6d243ec30a3.jpg?alt=media&token=2b865d95-9b" +
                    "7a-40f6-a3ed-9079ce24418d",
            "questions": [
                {
                    "answer": "Taz",
                    "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                            "tionsFiles%2Ffcb81ad2-e960-479f-a2a4-ff05e93e89dd.jpg?alt=media&token=dcb2ce91" +
                            "-1235-495b-b6b3-4076dad939b9",
                    "type": "image",
                    "question": "What is the name of this character",
                    "points": "200",
                    "level": "easy"
                }, {
                    "level": "easy",
                    "points": "200",
                    "answer": "Mr. Burns",
                    "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                            "tionsFiles%2Fcb4629c8-d809-4b10-b6a1-a81cfd773f9d.jpg?alt=media&token=194a0fb4" +
                            "-c088-4ef9-9c38-5ff605385ea9",
                    "question": "What is the name of this character",
                    "type": "image"
                }, {
                    "points": "500",
                    "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                            "tionsFiles%2F8e7e5be0-3d77-414a-8e56-5bcf19efaadb.jpg?alt=media&token=c09c0751" +
                            "-c1d5-4d3a-b0be-5fd7df494721",
                    "answer": "Donald duck",
                    "question": "What is the name of this character",
                    "level": "easy",
                    "type": "image"
                }, {
                    "type": "image",
                    "points": "800",
                    "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                            "tionsFiles%2F65a4afa8-1b34-4b89-9f02-3da4bfa930a9.jpg?alt=media&token=648416e8" +
                            "-8a25-49b1-b924-859459cf4497",
                    "level": "easy",
                    "answer": "Doraemon",
                    "question": "What is the name of this character"
                }, {
                    "points": "500",
                    "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                            "tionsFiles%2Fb758bbbd-0342-4e32-a4da-ce23b5acfc25.jpg?alt=media&token=4b489eda" +
                            "-4c54-4026-942f-b9e0abe9496d",
                    "answer": "Micky mouse",
                    "question": "What is the name of this character",
                    "level": "easy",
                    "type": "image"
                }, {
                    "question": "What is the name of this character",
                    "level": "easy",
                    "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                            "tionsFiles%2F7a682f36-d4fe-4637-8761-c090a6253ee4.jpg?alt=media&token=1d5321e8" +
                            "-8570-4f7e-93f9-9a212546ad09",
                    "points": "800",
                    "type": "image",
                    "answer": "Stitch"
                }
            ]
        }
    }, {
        "id": "w3dJ4hhG3FW0DXXwmiHe",
        "quizz": {
            "questions": [
                {
                    "points": "200",
                    "question": "when did the First World War end?",
                    "answer": "1918",
                    "media": null,
                    "level": "easy",
                    "type": "text"
                }, {
                    "question": "when did the Second World War end?",
                    "media": null,
                    "answer": "1945",
                    "points": "200",
                    "type": "text",
                    "level": "easy"
                }, {
                    "type": "text",
                    "media": null,
                    "question": "The first use of modern paper was in __ ",
                    "points": "500",
                    "level": "medium",
                    "answer": "105AD"
                }, {
                    "media": null,
                    "type": "text",
                    "level": "medium",
                    "question": "Genghis Khan began his conquest of Asia in __ ",
                    "points": "500",
                    "answer": "1206"
                }, {
                    "level": "medium",
                    "answer": "1088",
                    "question": "The first university was founded in Bologna, Italy in __ ",
                    "media": null,
                    "type": "text",
                    "points": "800"
                }, {
                    "type": "text",
                    "level": "medium",
                    "points": "800",
                    "question": "__ was the Birth of Buddha ",
                    "answer": "486BC",
                    "media": null
                }
            ],
            "title": "World History",
            "image": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/quiz" +
                    "zImages%2F86344004-36ec-4d93-ac9c-dd0dd5537bb7.jpg?alt=media&token=9cf15413-52" +
                    "30-4bfd-9088-2d5240436da3"
        }
    }, {
        "id": "y0nqhWTkVVIrQprl3xw4",
        "quizz": {
            "questions": [
                {
                    "level": "easy",
                    "points": "200",
                    "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                            "tionsFiles%2F1af74df2-9dbc-4ea6-a55d-0b7795a7e887.mp4?alt=media&token=3bd0e400" +
                            "-371d-4a32-8372-65232a5df669",
                    "type": "video",
                    "answer": "1972",
                    "question": "In which year was The Godfather first released? "
                }, {
                    "question": "Which actor won the Best Actor Oscar for the films Philadelphia (1993) and For" +
                            "rest Gump (1994)? ",
                    "type": "video",
                    "level": "easy",
                    "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                            "tionsFiles%2Fab581e1e-ae3b-4bfd-965f-7d4ab1aa5318.mp4?alt=media&token=ba9c4801" +
                            "-2998-46ad-8304-1dd596942aae",
                    "points": "200",
                    "answer": "Tom Hanks"
                }, {
                    "points": "500",
                    "answer": "E.T. The Extra-Terrestrial",
                    "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                            "tionsFiles%2Feccf4a45-15b7-4c28-b203-222ca628c782.mp4?alt=media&token=b16858db" +
                            "-befc-49eb-a586-36af41a6668c",
                    "question": "Which 1982 film was greatly accepted by film fans for its portrayal of the lov" +
                            "e between a young, fatherless suburban boy and a lost, benevolent and homesick" +
                            " visitor from another planet? ",
                    "level": "medium",
                    "type": "video"
                }, {
                    "level": "medium",
                    "answer": "37",
                    "question": "How many self-referential cameos did Alfred Hitchcock make in his films from 1" +
                            "927-1976 – 33, 35 or 37? ",
                    "type": "video",
                    "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                            "tionsFiles%2F8e43b738-ed5a-4ead-839c-97d84eaaf63d.mp4?alt=media&token=32273fe1" +
                            "-1447-4a7f-a76c-4dae62f05ad4",
                    "points": "500"
                }, {
                    "answer": "Julie Andrews",
                    "points": "800",
                    "question": "Which actress played Mary Poppins in the 1964 film Mary Poppins? ",
                    "type": "video",
                    "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                            "tionsFiles%2F94e7b725-7c8e-4b6c-8d7c-d1a352fb201d.mp4?alt=media&token=e9c75521" +
                            "-eaa1-4cfa-ba60-94f0b3526e06",
                    "level": "hard"
                }, {
                    "type": "video",
                    "answer": "The Great Escape",
                    "question": "In which 1963 classic film did Charles Bronson appear? ",
                    "points": "800",
                    "level": "hard",
                    "media": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/ques" +
                            "tionsFiles%2F6de39666-162b-4c8d-a868-0cbbbebbccd4.mp4?alt=media&token=d6932ebd" +
                            "-1faf-4bdd-b519-4afe1519e8a8"
                }
            ],
            "title": "Movies",
            "image": "https://firebasestorage.googleapis.com/v0/b/quizz-app-cc139.appspot.com/o/quiz" +
                    "zImages%2Fd8a96644-e902-4c58-b0ff-f9c4e2b5e9f5.jpg?alt=media&token=1049922a-0f" +
                    "4c-42bb-aa61-a4c1f733a615"
        }
    }
]

const NewGameSecondPage = ({}) => {

    const subjectCards = choosenQuizList.map(
        subject => <div key={uuidv4()} className='w-full row items-center border'>
					<HomeQuizzCard quizz={subject.quizz} />
					<div>
						{""}
					</div>
				</div>
    )
		// console.log("🚀 ~ NewGameSecondPage ~ subject.title:", choosenQuizList[0].title)
		
    return (<div className='w-screen min-h-screen col items-center'>
			<div className='w-[80dvw] col gap-5'>{subjectCards}</div>
		</div>)
}

export default NewGameSecondPage