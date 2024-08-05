const defaultGameRecord = (game) => {
    return {
        gameId: game.id,
        teams: [
            {
                name: game.gameObj.team1,
                points: 0
            }, {
                name: game.gameObj.team2,
                points: 0
            }
        ],
        usedLifeLines: [
            1, 1, 1
        ],
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