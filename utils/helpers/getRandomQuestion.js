export function getRandomQuestion(questions) {
	if (!questions || questions.length === 0) {
		// console.error("No questions available.");
		return () => ({});
	}

	// Initialize an array to keep track of used indices
	const usedIndices = [];

	return function () {
		if (usedIndices.length === questions.length) {
			// console.warn("All questions have been used.");
			return () => ({});
		}

		// Generate a random index that hasn't been used yet
		let randomIndex;
		do {
			randomIndex = Math.floor(Math.random() * questions.length);
		} while (usedIndices.includes(randomIndex));

		// Mark the index as used
		usedIndices.push(randomIndex);

		// Return the selected question
		return questions[randomIndex];
	};
}