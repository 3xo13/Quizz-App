const handleLevelChange = (e, index, parentIndex, setCurrentValue, setParentCategories, randomQuestions) => {

	setCurrentValue(prev => prev.map(
		(level, levelIndex) => levelIndex === index
			? e.target.value
			: level
	));
	setParentCategories(prev => {
		return prev.map((obj, i) => {
			if (i === parentIndex) {
				return {
					...obj,
					quizz: {
						...obj.quizz,
						questionLevels: obj
							.quizz
							.questionLevels
							.map(
								(level, levelIndex) => levelIndex === index
									? e.target.value
									: level
							),
							
					}
				}
			}
			return obj
		})
	})
}

export {handleLevelChange}