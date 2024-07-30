"use client"
import React, {useState, useEffect, useMemo, useRef} from 'react'
import {v4 as uuidv4} from 'uuid';
import {collection, addDoc} from 'firebase/firestore';
import {database} from '@/app/_lip/firebase/firebaseConfig';
import {removeItemFromArrayState} from '@/utils/stateFunctions/removeItemFromArrayState';
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {storage} from '@/app/_lip/firebase/firebaseConfig';
import Image from 'next/image';
import SingleQuestionCard from '@/components/dashboard/quizz/SingleQuestionCard';
import RadioBtn from '@/components/global/formElements/RadioBtn';
import uploadfile from '@/utils/database/uploadfile';
import LoadingOverlay from '@/components/global/LoadingOverlay';
import HomeQuizzCard from '@/components/quizz/HomeQuizzCard';
import DashQuizzCard from '@/components/quizz/DashQuizzCard';
import MediaInput from '@/components/global/formElements/MediaInput';

const NewQuizz = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);

    const [questions, setQuestions] = useState([]);
    // current question
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [type, setType] = useState("text");
    const [questionMedia, setQuestionMedia] = useState(null);
    const [level, setLevel] = useState("easy");
    const [points, setPoints] = useState(100);

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState("");


    const mimoQuizCard = useMemo(() => <DashQuizzCard
        quizz={{
            title,
            image
        }} />, [title, image])

    const mediaInputRef = useRef()

    // reset media file if question is text
    useEffect(() => {
        setQuestionMedia(null);
    }, [type])

    // reset media file if question is text
    useEffect(() => {
        setErrorMessage("");
    }, [type, question, answer, questionMedia])

    const handleNewQuestion = async (event) => {
        event.preventDefault();
        if (questions.length == 6)
            return setErrorMessage("you can't add more questions");
        if (!question) 
            return setErrorMessage("please add question");
        if (!answer) 
            return setErrorMessage("please add answer");
        if (type != "text" && !questionMedia) 
            return setErrorMessage("please add a file");
        setLoading(true)
        const media = await uploadfile(questionMedia, "questionsFiles")
        setQuestions(prev => [
            ...prev, {
                question,
                answer,
                type,
                media,
                level,
                points
            }
        ]);
        setAnswer("");
        setQuestion("");
        setLoading(false)
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
        setLoading(true)
        const imageUrl = await uploadfile(image, "quizzImages")

        const newPost = await addDoc(collection(database, 'questions'), {
            title: title.trim(),
            image: imageUrl,
            questions
        });
        setLoading(false)
        setQuestions([])
    };

    const questionsList = questions.map(
        (questionObject, index) => <SingleQuestionCard
            key={uuidv4()}
            questionObject={questionObject}
            index={index}
            setQuestions={setQuestions}
            questions={questions}/>
    )

    return (
        <div className='text-black col gap-10 max-w-[98dvw] w-screen items-center p-5 overflow-x-hidden'>
            {/* list questions */}
            {
                loading
                    ? <LoadingOverlay/>
                    : null
            }
            {/* error message */}
            {
                errorMessage
                    ? <p className='text-red-400 text-lg capitalize'>{errorMessage}</p>
                    : null
            }

            {/* form */}
            <div className='w-full col items-center'>
                <div
                    className='row w-full gap-5 p-5'>
                    <div className='w-1/2 h-full col items-center gap-10'>
                        {/* Quizz Title and Image */}
                        <form className="w-full">
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
                                            className='textInput'/></div>
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
                                            }}/></div>
                                </div>
                            </div>
                        </form>
                        {/* quizz card */}
                        {
                            title && image
                                ? mimoQuizCard
                                : null
                        }
                    </div>

                    {/* New Question */}
                    <form className="w-1/2">
                        <div className='col gap-5 bg-slate-600 rounded-lg shadow-lg text-white  p-5 '>
                            {/* question */}
                            <div className='col gap-2'>
                                <label htmlFor="question" className='requiered'>Question</label>
                                <input
                                    type="text"
                                    id='question'
                                    value={question}
                                    onChange={e => setQuestion(e.target.value)}
                                    className='textInput'/></div>
                            {/* question type */}
                            <div className='col gap-5 border-b-2 pb-2 border-slate-100'>
                                <h4 className=''>Question Type</h4>
                                <div className='row justify-between'>
                                    <RadioBtn state={type} setState={setType} value={"text"}/>
                                    <RadioBtn state={type} setState={setType} value={"image"}/>
                                    <RadioBtn state={type} setState={setType} value={"audio"}/>
                                    <RadioBtn state={type} setState={setType} value={"video"}/>
                                </div>
                            </div>

                            {/* media file */}
                            {
                                type != "text"
                                    ? <div className='col gap-2 border-b-2 pb-2 border-slate-100'>
                                        <label htmlFor="media" className='requiered'>Media</label>
                                        <input
                                            ref={mediaInputRef}
                                            type="file"
                                            id='media'
                                            multiple={false}
                                            accept={`${type}/*`}
                                            onChange={e => setQuestionMedia(e.target.files[0])} /></div>
                                    : null
                            }

                            {/* level */}
                            <div className='col gap-5 border-b-2 pb-2 border-slate-100'>
                                <h4 className=''>Level</h4>
                                <div className='row justify-between'>
                                    <RadioBtn state={level} setState={setLevel} value={"easy"}/>
                                    <RadioBtn state={level} setState={setLevel} value={"medium"}/>
                                    <RadioBtn state={level} setState={setLevel} value={"hard"}/>
                                </div>
                            </div>
                            {/* points */}
                            <div className="w-full border-b-2 pb-2 border-slate-100">

                                <div className="" id="tooltip">
                                    {` Points : ${points}`}
                                </div>
                                <input
                                    type="range"
                                    min={100}
                                    max={1000}
                                    step={100}
                                    value={points}
                                    onChange={e => setPoints(e.target.value)}
                                    className="w-full"/>

                            </div>

                            {/* answer */}
                            <div className='col gap-2'>
                                <label htmlFor="answer" className='requiered'>Answer</label>
                                <input
                                    type="text"
                                    id='answer'
                                    value={answer}
                                    onChange={e => setAnswer(e.target.value)}
                                    className='textInput'/></div>

                            <button
                                onClick={e => handleNewQuestion(e)}
                                className='bg-green-500 rounded text-white py-1'>Add</button>
                        </div>

                    </form>

                </div>
            </div>
            {/* questions preview */}
            <div
                className='w-full col items-center p-5 gap-3 bg-slate-600 rounded-lg shadow-lg' 
                style={{ opacity: questions.length ? 1 : 0}}>
                {questions.length ? <h2 className='text-start text-white text-2xl '>Questions</h2> : null}
                <div className='grid grid-cols-2 grid-rows-auto gap-5'>
                    {questionsList}
                </div>
                <div className='w-[50%]'>
                {
                    questions.length == 6
                        ? <button
                            className='bg-green-500 rounded text-slate-100 w-full py-1 text-lg mt-10'
                                onClick={handleSubmit}>Submit</button>
                        : null
                }

                </div>
            </div>

        </div>
    )
}

export default NewQuizz