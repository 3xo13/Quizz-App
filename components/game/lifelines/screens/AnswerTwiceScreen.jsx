"use client"
import { useStore } from '@/components/stateManager/DataStore';
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const AnswerTwiceScreen = () => {

	return (
		<div className='full flex-col-center gap-5 bg-white/50 px-5 rounded-lg'>

			<h2 className="text-2xl font-bold mb-4 text-center gradientText">You Can Give Two Answers For this Question</h2>

		</div>
	)
}

export default AnswerTwiceScreen