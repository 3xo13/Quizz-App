"use client"
import React, { useState, useEffect, useMemo, useRef } from 'react'
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { database } from '@/utils/database/firebase/firebaseConfig';
import uploadfile from '@/utils/database/functions/uploadfile';
import LoadingOverlay from '@/components/global/LoadingOverlay';
import DashQuizzCard from '@/components/quizz/DashQuizzCard';
import QuizzModel from '@/utils/database/models/QuizzModel';

const NewCategory = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState("");

    const mimoQuizCard = useMemo(
        () => <DashQuizzCard
            quizz={{
                title,
                image
            }} />,
        [title, image]
    )

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!title)
            return setErrorMessage("Please add a Title");
        if (!image)
            return setErrorMessage("Please Upload an Image");

        setLoading(true)
        const imageUrl = await uploadfile(image, "quizzImages")

        const newQuizz = await addDoc(
            collection(database, 'categories'),
            QuizzModel(title, imageUrl)
        );
        setTitle("")
        setImage({})
        setLoading(false)
    };

    return (
        <div
            className='text-black col gap-10 max-w-[98dvw] w-screen items-center p-5 overflow-x-hidden'>
            {/* list questions */}
            {
                loading
                    ? <LoadingOverlay />
                    : null
            }

            {/* form */}
            <div className='w-full col items-center'>
                <div className='col items-center w-full gap-5 p-5'>
                    <div className='w-full h-full row '>

                        {/* Quizz Title and Image */}
                        <form className="w-1/2">
                            <div className='col gap-5 bg-slate-600 rounded-lg shadow-lg text-white p-5'>
                                <div className='col gap-5 w-full'>
                                    {/* quizz title */}
                                    <div className='col gap-2'>
                                        <label htmlFor="title" className="requiered">Quizz Title</label>
                                        <input
                                            type="text"
                                            id='title'
                                            value={title}
                                            onChange={e => {
                                                setTitle(e.target.value)
                                                setErrorMessage("")
                                            }}
                                            className='textInput'
                                            required={true} /></div>
                                    {/* quizz image */}
                                    <div className='col gap-2'>
                                        <label htmlFor="image" className="requiered">Image</label>
                                        <input
                                            type="file"
                                            id='image'
                                            accept="image/*"
                                            multiple={false}
                                            onChange={e => {
                                                setErrorMessage("")
                                                setImage(e.target.files[0])
                                            }}
                                            required={true} /></div>
                                </div>
                            </div>
                        </form>
                        {/* quizz card */}
                        <div className='w-1/2 flex-center '>
                            {
                                title && image
                                    ? mimoQuizCard
                                    : null
                            }
                        </div>
                    </div>

                    <button
                        className='bg-green-500 rounded text-slate-100 py-1 text-lg mt-10 w-1/2'
                        onClick={handleSubmit}>Submit</button>

                </div>
                {/* error message */}
                {
                    errorMessage
                        ? <p className='text-red-400 text-lg capitalize'>{errorMessage}</p>
                        : null
                }
            </div>

        </div>
    )
}

export default NewCategory