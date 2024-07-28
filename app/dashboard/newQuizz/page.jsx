"use client"
import React, {useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid';
import {collection, addDoc} from 'firebase/firestore';
import {database} from '@/app/_lip/firebase/firebaseConfig';
import {removeItemFromArrayState} from '@/utils/stateFunctions/removeItemFromArrayState';
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {storage} from '@/app/_lip/firebase/firebaseConfig';
import Image from 'next/image';
import SingleQuestionCard from '@/components/dashboard/quizz/SingleQuestionCard';

const NewQuizz = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);

    const [questions, setQuestions] = useState([]);
    const [currenQuestion, setCurrenQuestion] = useState("");
    const [currentAnswer, setcurrentAnswer] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const handleNewQuestion = (event) => {
        event.preventDefault();
        setQuestions(prev => [
            ...prev, {
                question: currenQuestion,
                answer: currentAnswer,
                type: "Text (temporary default)",
                media: "it well be added soon"
            }
        ]);
        setcurrentAnswer("");
        setCurrenQuestion("");
        console.log("image :", image);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
				if (!title) {
						setErrorMessage("Please add a Title")
						return;
				}
        if (!image) {
            setErrorMessage("Please Upload an Image")
            return;
        }
        const fileType = image
            .name
            .split(".")
            .pop()
        const imagePath = `quizzImages/${title.replace(/[^a-zA-Z0-9_-]/g, '')}.${fileType}`
        // upload image
        const storageRef = ref(storage, imagePath);
        // 'file' comes from the Blob or File API
        await uploadBytes(storageRef, image).then(async (snapshot) => {
            console.log('Uploaded a blob or file!');
            const imageUrl = await getDownloadURL(storageRef)

            const newPost = await addDoc(collection(database, 'questions'), {
                title: title.trim(),
                image: imageUrl,
                questions
            });
        });

        // console.log("🚀 ~ newPost ~ newPost:", newPost)
    };

    const questionsList = questions.map(
        (questionObject, index) => <SingleQuestionCard
            key={uuidv4()}
            question={questionObject}
            index={index}
            setQuestions={setQuestions}
            questions={questions}/>
    )

    return (
        <div className='text-black col gap-10 w-screen items-center p-5'>
            {/* list questions */}
            {
                errorMessage
                    ? <p className='text-red-400 text-lg capitalize'>{errorMessage}</p>
                    : null
            }
            <div className='w-full row items-center'>
                <div
                    className='w-[50dvw] h-[70dvh] overflow-y-auto col items-center p-5 gap-3 '>
                    <h2 className='w-[40dvw] text-start'>Questions</h2>
                    {questionsList}
                    {
                        questions.length
								? <button className='bg-green-400 rounded text-white w-[40dvw] py-1' onClick={handleSubmit}>Submit</button>
                            : null
                    }
                </div>
                <div className='col items-center w-[50dvw] min-h-[70dvh] gap-5 p-5'>
                    {/* Title and Image */}
                    <form className="w-full">
                        <div className='col gap-5 w-full  p-5'>
                            <div className='col gap-2'>
                                <label htmlFor="title" className="after:content-['_*'] after:text-red-500">Quizz Title</label>
                                <input
                                    type="text"
                                    id='title'
                                    value={title}
                                    onChange={e => {
                                        setTitle(e.target.value)
                                        setErrorMessage("")
                                    }}/></div>
                            <div className='col gap-2'>
									<label htmlFor="image" className="after:content-['_*'] after:text-red-500">Image</label>
                                <input
                                    type="file"
                                    id='image'
                                    accept="image/*"
                                    multiple={false}
                                    onChange={e => {
                                        setErrorMessage("")
                                        setImage(e.target.files[0])
                                    }}/></div>
                        </div>

                    </form>

                    {/* New Question */}
                    <form className="w-full">
                        <div className='col gap-5 w-full  p-5'>
                            <div className='col gap-2'>
                                <label htmlFor="question">Question</label>
                                <input
                                    type="text"
                                    id='question'
                                    value={currenQuestion}
                                    onChange={e => setCurrenQuestion(e.target.value)}/></div>
                            <div className='col gap-2'>
                                <label htmlFor="answer">Answer</label>
                                <input
                                    type="text"
                                    id='answer'
                                    value={currentAnswer}
                                    onChange={e => setcurrentAnswer(e.target.value)}/></div>

                            <button onClick={e => handleNewQuestion(e)} className='bg-green-400 rounded text-white py-1'>Add</button>
                        </div>

                    </form>

                </div>

            </div>

        </div>
    )
}

export default NewQuizz