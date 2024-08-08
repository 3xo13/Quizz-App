import { useStore } from '@/components/stateManager/DataStore'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

const AnswerTwice = ({ team, index }) => {
	const setIsAnswereTwice = useStore(state => state.setIsAnswereTwice);
	const gameRecord = useStore(state => state.gameRecord);
	const setTeam1LifelineUsingRecord = useStore(state => state.setTeam1LifelineUsingRecord)
	const setTeam2LifelineUsingRecord = useStore(state => state.setTeam2LifelineUsingRecord)
	const showQuestion = useStore(state => state.showQuestion)

	const [disabled, setDisabled] = useState(false)

	useEffect(() => {
		if (Object.keys(gameRecord).length) {
			const currentTeam = gameRecord.team1.name == team ? gameRecord.team1 : gameRecord.team2;
			if (!currentTeam.gameLifeLines.usingRecord[index]) {
				setDisabled(true)
			}
		}
	}, [gameRecord])

	const handleClick = () => {
		if (!showQuestion) {
			return;
		}
		setIsAnswereTwice(true);
		if (gameRecord.team1.name == team) {
			setTeam1LifelineUsingRecord(index)
		}
		if (gameRecord.team2.name == team) {
			setTeam2LifelineUsingRecord(index)
		}
	}

	return (
		<button className='' onClick={handleClick} disabled={disabled}>
			<Image src={"/images/icons/lifelines/tick.png"}
				width={30} height={30} alt='call a friend' className='w-8 h-8' style={{
					opacity: disabled
						? "0.2"
						: 1
				}} />
		</button>
	)
}

export default AnswerTwice