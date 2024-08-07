const getTeam = (gameRecord, TeamName) => {
	const team = gameRecord.team1.name == TeamName
        ? {
            parentRef: "team1",
            team: gameRecord.team1
        }
        : {
            parentRef: "team2",
            team: gameRecord.team2
        }
    return team
}

export default getTeam