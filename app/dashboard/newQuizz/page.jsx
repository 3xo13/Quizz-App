"use client"
import React, {useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid';
import {collection, addDoc} from 'firebase/firestore';
import {database} from '@/app/_lip/firebase/firebaseConfig';
import { removeItemFromArrayState } from '@/utils/stateFunctions/removeItemFromArrayState';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '@/app/_lip/firebase/firebaseConfig';


const NewQuizz = () => {
	const [title, setTitle] = useState("");
	const [image, setImage] = useState(null);

    const [questions, setQuestions] = useState([]);
    const [currenQuestion, setCurrenQuestion] = useState("");
    const [currentAnswer, setcurrentAnswer] = useState("");

    const handleNewQuestion = (event) => {
        event.preventDefault();
        setQuestions(prev => [
            ...prev, {
                question: currenQuestion,
                answer: currentAnswer
            }
        ]);
				setcurrentAnswer("");
				setCurrenQuestion("");
				console.log("image :", image);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
				if (!image) return;
				

				const fileType = image.name.split(".").pop()
			const imagePath = `quizzImages/${title.replace(/[^a-zA-Z0-9_-]/g, '') }.${fileType}`
				// upload image
			const storageRef = ref(storage, imagePath);
			// 'file' comes from the Blob or File API
			await uploadBytes(storageRef, image).then(async (snapshot) => {
				console.log('Uploaded a blob or file!');
				const imageUrl = await getDownloadURL(storageRef)
	
					const newPost = await addDoc(collection(database, 'questions'), {
						title: title.trim(),
						image: imageUrl,
						questions,
					});
			});

				// console.log("🚀 ~ newPost ~ newPost:", newPost)
			};

	

    const questionsList = questions.map(
        (questionObject, index) => <div key={uuidv4()} className='row gap-5'>
            <p>{questionObject.question}</p>
            <p>{questionObject.answer}</p>
						<button className='border' onClick={e => removeItemFromArrayState(index, setQuestions, questions.length)}>x</button>
        </div>
    )

    return (
        <div className='text-black col gap-10 w-screen items-center'>
					{/* Title and Image */}
				<form>
					<div className='col gap-5 w-[60dvw] bg-gray-200 p-5'>
						<div className='col gap-2'>
							<label htmlFor="title">Quizz Title</label>
							<input
								type="text"
								id='title'
								value={title}
								onChange={e => setTitle(e.target.value)} /></div>
						<div className='col gap-2'>
							<label htmlFor="image">Image</label>
							<input
								type="file"
								id='image'
								accept="image/*"
								multiple={false}
								onChange={e => setImage(e.target.files[0])} /></div>
					</div>

				</form>

            <form>
                <div className='col gap-5 w-[60dvw] bg-gray-200 p-5'>
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

                    <button onClick={e => handleNewQuestion(e)} className='border'>Add</button>
                </div>

            </form>
            <div className='col ga-3 bg-green-100'>
                <h2>Questions</h2>
                {questionsList}
                {
                    questions.length
                        ? <button className='' onClick={handleSubmit}>Submit</button>
                        : null
                }
            </div>
        </div>
    )
}

export default NewQuizz