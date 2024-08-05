import {create} from 'zustand'

const useStore = create((set) => ({
	// the current game record
    gameRecord: {},
	setGameRecord: (gameRecord) => set({gameRecord}),
	setTeam1: (team1) => set((state) => ({
        gameRecord: {
            ...state.gameRecord,
            teams: [state.gameRecord.teams[1], team1]
        }
    })),
	setTeam2: (team2) => set((state) => ({
		gameRecord: {
			...state.gameRecord,
			teams: [state.gameRecord.teams[0], team2]
		}
	})),

	// is current question answered, (the answer was displayed)
	isAnswered: false,
	setIsAnswered: (isAnswered) => set({ isAnswered }),

	currentQuestion: {},
	setCurrentQuestion: (currentQuestion) => set({ currentQuestion }),

	showQuestion: false,
	setShowQuestion: (showQuestion) => set({ showQuestion })
}))

export {useStore}
