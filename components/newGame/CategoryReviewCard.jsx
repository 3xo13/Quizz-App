"use client"
import React from 'react'
import QuestionsOptions from './QuestionsOptions'

const CategoryReviewCard = ({ setCategoryList, category, index, setGameObject}) => {
	return (
		<div
			className='w-full h-fit col items-center border p-3 bg-white rounded shadow-lg shadow-gray-600 relative z-10 bg-cover bg-center'
			style={{
				backgroundImage: `url(${category.quizz.image})`
			}}>
			<div className='absolute top-0 left-0 z-0 w-full h-full bg-white/85'></div>
			<div className='w-full flex-center'>
				<p className="text-gray-700 text-lg z-20 capitalize font-medium">{category.quizz.title}</p>
			</div>
			<div className='w-full flex-center z-20'>
				<QuestionsOptions
				numberOfQuestions={6}
				parentIndex={index}
				setQuizzList={setCategoryList}
				quizz={category}
				setGameObject={setGameObject} /></div>
		</div>
	)
}

export default CategoryReviewCard