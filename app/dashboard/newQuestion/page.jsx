"use client"
import React, { useState, useEffect, useMemo, useRef } from 'react'
import SingleQuestionCard from '@/components/dashboard/quizz/SingleQuestionCard';
import RadioBtn from '@/components/global/formElements/RadioBtn';
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from 'next/navigation';
import uploadfile from '@/utils/database/functions/uploadfile';
import { addDoc, arrayUnion, collection, doc, getDoc, increment, updateDoc, } from 'firebase/firestore';
import { database } from '@/utils/database/firebase/firebaseConfig';
import addQuestionToCategory from '@/utils/database/functions/addQuestionToCategory';
import LoadingOverlay from '@/components/global/LoadingOverlay';


const NewQoestion = () => {
	const searchParam = useSearchParams()
	const categoryId = searchParam.get("id")
	const category = searchParam.get("name")
	const [questionPreview, setQuestionPreview] = useState([]);
	// current question
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");
	const [type, setType] = useState("text");
	const [questionMedia, setQuestionMedia] = useState(null);
	const [level, setLevel] = useState("easy");
	const [points, setPoints] = useState(100);

	const mediaInputRef = useRef()
	const [loading, setLoading] = useState(false);

	// reset media file if question is text
	useEffect(() => {
		setQuestionMedia(null);
	}, [type])

	// reset media file if question is text
	useEffect(() => {
		// setErrorMessage("");
	}, [type, question, answer, questionMedia])

	const handleNewQuestion = async (event) => {
		event.preventDefault();
		if (questionPreview.length == 6)
			return setErrorMessage("you can't add more questionPreview");
		if (!question)
			return setErrorMessage("please add question");
		if (!answer)
			return setErrorMessage("please add answer");
		if (type != "text" && !questionMedia)
			return setErrorMessage("please add a file");
		setLoading(true)

		const fileUrl = await uploadfile(questionMedia, "questionFiles")

		const newQuestion = await addDoc(
			collection(database, 'questions'),
			{
				question,
				answer,
				type,
				level,
				points,
				media: fileUrl,
				categoryId,
				category
			}
		);
		const updateCategoryResult = addQuestionToCategory(categoryId, newQuestion.id, level)
		if (updateCategoryResult) {
			setAnswer("");
			setQuestion("");
			
		}
		setLoading(false)
	}


	return (
		<div className='w-screen col pt-10'>
			{loading && <LoadingOverlay /> }
			<div className='w-full flex-center'>
				<h1 className='gradientText text-xl'>{category}</h1>
			</div>
			<div className='row w-full pt-10'>
				{/* questionPreview preview */}
				<div
					className='w-1/2 col items-center p-5 gap-3 bg-slate-600 rounded-lg shadow-lg'
					style={{
						opacity: questionPreview.length
							? 1
							: 0
					}}>
					{
						questionPreview.length
							? <h2 className='text-start text-white text-2xl '>QuestionPreview</h2>
							: null
					}
					<div className='grid grid-cols-2 grid-rows-auto gap-5'>
						{/* {questionPreviewList} */}
					</div>
					<div className='w-[50%]'></div>
				</div>
				<div className='w-1/2 px-10'>
					{/* New Question */}
					<form className="w-full">
						<div className='col gap-5 bg-slate-600 rounded-lg shadow-lg text-white  p-5 '>
							{/* question */}
							<div className='col gap-2'>
								<label htmlFor="question" className='requiered'>Question</label>
								<input
									type="text"
									id='question'
									value={question}
									onChange={e => setQuestion(e.target.value)}
									className='textInput' /></div>
							{/* question type */}
							<div className='col gap-5 border-b-2 pb-2 border-slate-100'>
								<h4 className=''>Question Type</h4>
								<div className='row justify-between'>
									<RadioBtn state={type} setState={setType} value={"text"} />
									<RadioBtn state={type} setState={setType} value={"image"} />
									<RadioBtn state={type} setState={setType} value={"audio"} />
									<RadioBtn state={type} setState={setType} value={"video"} />
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
									<RadioBtn state={level} setState={setLevel} value={"easy"} />
									<RadioBtn state={level} setState={setLevel} value={"medium"} />
									<RadioBtn state={level} setState={setLevel} value={"hard"} />
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
									className="w-full" />

							</div>

							{/* answer */}
							<div className='col gap-2'>
								<label htmlFor="answer" className='requiered'>Answer</label>
								<input
									type="text"
									id='answer'
									value={answer}
									onChange={e => setAnswer(e.target.value)}
									className='textInput' /></div>

							<button
								onClick={e => handleNewQuestion(e)}
								className='bg-green-500 rounded text-white py-1'>Add</button>
						</div>

					</form>
				</div></div>


		</div>
	)
}

export default NewQoestion