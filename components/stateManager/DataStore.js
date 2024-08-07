import {create} from 'zustand'

const useStore = create((set) => ({
	// the current game record
    gameRecord: {},
	setGameRecord: (gameRecord) => set({gameRecord}),
	
	// team1 
	setTeam1: (team1) => set((state) => ({
        gameRecord: {
            ...state.gameRecord,
            team1
        }
    })),
	setTeam1Points: (points) => set((state) => ({
		gameRecord: {
			...state.gameRecord,
			team1: {
				...state.gameRecord.team1,
				points 
			}
		}
	})),

	setTeam1LifelineUsingRecord: (index) => set((state) => ({
		gameRecord: {
			...state.gameRecord,
			team1: {
				...state.gameRecord.team1,
				gameLifeLines: {
					...state.gameRecord.team1.gameLifeLines,
					usingRecord: state.gameRecord.team1.gameLifeLines.usingRecord.map((el, i) => i == index ? 0 : el )
				}
			}
		}
	})),

	// team2
	setTeam2: (team2) => set((state) => ({
		gameRecord: {
			...state.gameRecord,
			team2
		}
	})),
	setTeam2Points: (points) => set((state) => ({
		gameRecord: {
			...state.gameRecord,
			team2: {
				...state.gameRecord.team2,
				points
			}
		}
	})),

	setTeam2LifelineUsingRecord: (index) => set((state) => ({
		gameRecord: {
			...state.gameRecord,
			team2: {
				...state.gameRecord.team2,
				gameLifeLines: {
					...state.gameRecord.team2.gameLifeLines,
					usingRecord: state.gameRecord.team2.gameLifeLines.usingRecord.map((el, i) => i == index ? 0 : el)
				}
			}
		}
	})),

	// is current question answered, (the answer was displayed)
	isAnswered: false,
	setIsAnswered: (isAnswered) => set({ isAnswered }),

	currentQuestion: {},
	setCurrentQuestion: (currentQuestion) => set({ currentQuestion }),

	showQuestion: false,
	setShowQuestion: (showQuestion) => set({ showQuestion }),

	currentPlayingTeam: "",
	setCurrentPlayingTeam: (currentPlayingTeam) => set({ currentPlayingTeam }),

	changeCurrentTeam: "",
	setChangeCurrentTeam: (changeCurrentTeam) => set({ changeCurrentTeam }),

	// lifelines
	isDoublePoints: false,
	setIsDoublePoints: (isDoublePoints) => set({ isDoublePoints }),

	isCallAFriend: false,
	setIsCallAFriend: (isCallAFriend) => set({ isCallAFriend }),

	isAnswereTwice: false,
	setIsAnswereTwice: (isAnswereTwice) => set({ isAnswereTwice }),

	isSubtractPoints: false,
	setIsSubtractPoints: (isSubtractPoints) => set({ isSubtractPoints }),
}))

export {useStore}
