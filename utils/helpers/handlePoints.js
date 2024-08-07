const handlePoints = (
    points,
    operation,
    questionPoints,
    currentTeam,
    gameRecord,
    setTeam1Points,
    setTeam2Points,
    setIsAnswered,
    setCurrentQuestion,
    setShowQuestion,
    isAnswered,
    isDoublePoints,
    isSubtract,
    setIsDoublePoints,
    setIsSubtractPoints
) => {
    
    const name = currentTeam.name;
    const team1Points = +gameRecord.team1.points
    const team2Points = +gameRecord.team2.points

    let currentPoints = +questionPoints;

    // custom points instead of question points
    if (points) {
        currentPoints = points
    }

    // double the question points
    if (isDoublePoints) {
        currentPoints = (+questionPoints * 2);
        setIsDoublePoints(false)
    }
    
    const subtractedTeam1Points = team1Points - currentPoints > 0 ? team1Points - currentPoints : 0;
    const subtractedTeam2Points = team2Points - currentPoints > 0 ? team2Points - currentPoints : 0;

    // subtract points from opponent team and add them to current team
    if (isSubtract && isAnswered) {
        if (gameRecord.team1.name == name) {
            setTeam2Points(subtractedTeam2Points)
        } else {
            setTeam1Points(subtractedTeam1Points)
        }
        setIsSubtractPoints(false)
    }

    // subtract points (only custom points)
    if (operation == "subtract") {
        if (gameRecord.team1.name == name) {
            setTeam1Points(team1Points - currentPoints)
        } else {
            setTeam2Points(team2Points - currentPoints)
        }
    }

    // add points to current team
    if (operation == "add" || isAnswered) {
        if (gameRecord.team1.name == name) {
            setTeam1Points(team1Points + currentPoints)
        } else {
            setTeam2Points(team2Points + currentPoints)
        }

    }

    // clear question states if question 
    if (isAnswered) {
        setIsAnswered(false)
        setCurrentQuestion({})
        setShowQuestion(false)
    }
}

export default handlePoints