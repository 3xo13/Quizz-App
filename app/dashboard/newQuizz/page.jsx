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
import RadioBtn from '@/components/global/formElements/RadioBtn';
import uploadfile from '@/utils/database/uploadfile';
import LoadingOverlay from '@/components/global/LoadingOverlay';

const NewQuizz = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);

    const [questions, setQuestions] = useState([]);
    // current question
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [questionType, setQuestionType] = useState("text");
    const [questionMedia, setQuestionMedia] = useState(null);

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState("");

    // reset media file if question is text
    useEffect(() => {
        if (questionType === "text") setQuestionMedia(null);
    },[questionType])

    const handleNewQuestion = async (event) => {
        event.preventDefault();
        if (!question) return setErrorMessage("please add question");
        if (!answer) return setErrorMessage("please add answer");
        if (questionType != "text" && !questionMedia) return setErrorMessage("please add a file");
        setLoading(true)
        const media = await uploadfile(questionMedia, "questionsFiles")
        setQuestions(prev => [
            ...prev, {
                question: question,
                answer: answer,
                type: questionType,
                media,
                level: "easy",
                points: 100
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
        <div className='text-black col gap-10 w-screen items-center p-5'>
            {/* list questions */}
            {loading ? <LoadingOverlay /> : null}
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
                            ? <button
                                    className='bg-green-400 rounded text-white w-[40dvw] py-1'
                                    onClick={handleSubmit}>Submit</button>
                            : null
                    }
                </div>
                <div className='col items-center w-[50dvw] min-h-[70dvh] gap-5 p-5'>
                    {/* Title and Image */}
                    <form className="w-full">
                        <div className='col gap-5 w-full  p-5'>
                            <div className='col gap-2'>
                                <label htmlFor="title" className="requiered">Quizz Title</label>
                                <input
                                    type="text"
                                    id='title'
                                    value={title}
                                    onChange={e => {
                                        setTitle(e.target.value)
                                        setErrorMessage("")
                                    }}/></div>
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

                    </form>

                    {/* New Question */}
                    <form className="w-full">
                        <div className='col gap-5 w-full  p-5'>
                            {/* question */}
                            <div className='col gap-2'>
                                <label htmlFor="question" className='requiered'>Question</label>
                                <input
                                    type="text"
                                    id='question'
                                    value={question}
                                    onChange={e => setQuestion(e.target.value)}/></div>
                                    {/* question type */}
                            <div className='col gap-5'>
                                <h4 className=''>Question Type</h4>
                                <div className='row justify-between'>
                                    <RadioBtn state={questionType} setState={setQuestionType} value={"text"}/>
                                    <RadioBtn state={questionType} setState={setQuestionType} value={"image"}/>
                                    <RadioBtn state={questionType} setState={setQuestionType} value={"audio"}/>
                                    <RadioBtn state={questionType} setState={setQuestionType} value={"video"}/>
                                </div>
                            </div>

                                    {/* media file */}
                            {questionType != "text" ? <div className='col gap-2'>
                                <label htmlFor="media" className='requiered'>media</label>
                                <input
                                    type="file"
                                    id='media'
                                    multiple={false}
                                    accept={`${questionType}/*`}
                                    onChange={e => setQuestionMedia(e.target.files[0])} /></div> : null}

                            {/* answer */}
                            <div className='col gap-2'>
                                <label htmlFor="answer" className='requiered'>Answer</label>
                                <input
                                    type="text"
                                    id='answer'
                                    value={answer}
                                    onChange={e => setAnswer(e.target.value)}/></div>

                            <button
                                onClick={e => handleNewQuestion(e)}
                                className='bg-green-400 rounded text-white py-1'>Add</button>
                        </div>

                    </form>

                </div>

            </div>

        </div>
    )
}

export default NewQuizz