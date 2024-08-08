import React, {useEffect, useState} from 'react'

const AcceptBtn = ({
    gameInfo,
    setErrorMessage,
    setIsSecondStep,
    choosenCategories,
    choosenLifelines,
    maxNum
}) => {

    const [isDisabled, setIsDisabled] = useState(true)
    useEffect(() => {
        const isCategoriesAccepted = choosenCategories.length === 6;
        const isLifelinesAccepted = choosenLifelines.length === 3;
        const isNamesAccepted = gameInfo.name && gameInfo.team1 && gameInfo.team2
            ? true
            : false;

        if (isNamesAccepted && isLifelinesAccepted && isCategoriesAccepted) {
            setIsDisabled(false)
        }
				if (!isNamesAccepted || !isLifelinesAccepted || !isCategoriesAccepted) {
            setIsDisabled(true)
        }
    }, [choosenCategories, choosenLifelines, gameInfo])

    const handleContinue = () => {
        if (!gameInfo.name || !gameInfo.team1 || !gameInfo.team2) {
            setErrorMessage("Pleas fill the game name and team names to continue")
            return;
        }
        if (choosenCategories.length < 6) {
            setErrorMessage("Pleas select a set of 6 categories")
            return;
        }
        if (choosenLifelines.length < 3) {
            setErrorMessage("Pleas select a set of 3 lifelines")
            return;
        }
        setIsSecondStep(true)
    }

    return (
        <div className='w-full pt-5 flex-center'>
            <button
                className={`border px-3 py-2 rounded text-white 
											${ !isDisabled
                    ? "bg-green-500"
                    : "bg-gray-500"}`}
                onClick={handleContinue}
                disabled={isDisabled}>Accept & Continue</button>
        </div>
    )
}

export default AcceptBtn