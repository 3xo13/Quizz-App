const defaultGameRecord = (game) => {
    return {
        gameId: game.id,
        team1: {
            name: game.gameObj.team1,
            points: 0,
            gameLifeLines: {
                lifeLines: game.gameObj.lifelines,
                usingRecord: [1, 1, 1]
            }
        },
        team2: {
            name: game.gameObj.team2,
            points: 0,
            gameLifeLines: {
                lifeLines: game.gameObj.lifelines,
                usingRecord: [1, 1, 1]
            }
        },

        categories: game
            .categories
            .map(cat => ({
                category: cat.category.title,
                questions: [
                    1,
                    1,
                    1,
                    1,
                    1,
                    1
                ]
            }))
    }
}

export default defaultGameRecord