
function endScreenScores() 
{
    var opponentScore = 125
    var counterOpponent = 0
    var speedOpponent = 145
    var changeSpeedOpponent = speedOpponent
    theIntervalOpponent = setInterval(myIntervalOpponent, speedOpponent)

    function myIntervalOpponent() {
        if(changeSpeedOpponent != speedOpponent)
        {
            speedChangedOpponent()
            clearInterval(theIntervalOpponent)
            theIntervalOpponent = setInterval(myIntervalOpponent, speedOpponent)
        }

        if(counterOpponent < opponentScore + 1)
        {
            document.getElementById("opponent-Score-End-Screen").textContent = counterOpponent
            counterOpponent += 1
        }

        if(opponentScore > 100)
        {
            if(counterOpponent >= 0 && counterOpponent < 50)
            {
                lowerSpeedOpponent(2.5)
            }

            else if(counterOpponent >= opponentScore - 50)
            
            {
                updateSpeedOpponent(2.5)
            } 
        }

        else

        {
            if(counterOpponent <= 15)
            {
                lowerSpeedOpponent(7.5)
            }

            else if(counterOpponent >= opponentScore - 15)
            
            {
                updateSpeedOpponent(7.5)
            } 
        }
    }

    function lowerSpeedOpponent(speed) {
        changeSpeedOpponent -= speed
    }

    function speedChangedOpponent() {
        speedOpponent = changeSpeedOpponent
    }

    function updateSpeedOpponent(speed) {
        changeSpeedOpponent += speed
    }









    var yourScore = 175
    var counterYou = 0
    var speedYou = 145
    var changeSpeedYou = speedYou
    theIntervalYou = setInterval(myIntervalYou, speedYou)

    function myIntervalYou() {
        if(changeSpeedYou != speedYou)
        {
            speedChangedYou()
            clearInterval(theIntervalYou)
            theIntervalYou = setInterval(myIntervalYou, speedYou)
        }

        if(counterYou < yourScore + 1)
        {
            document.getElementById("your-Score-End-Screen").textContent = counterYou
            counterYou += 1
        }

        if(yourScore > 100)
        {
            if(counterYou >= 0 && counterYou < 50)
            {
                lowerSpeedYou(2.5)
            }

            else if(counterYou >= yourScore - 50)
            
            {
                updateSpeedYou(2.5)
            } 
        }

        else

        {
            if(counterYou <= 15)
            {
                lowerSpeedYou(7.5)
            }

            else if(counterYou >= yourScore - 15)
            
            {
                updateSpeedYou(7.5)
            } 
        }
    }

    function lowerSpeedYou(speed) {
        changeSpeedYou -= speed
    }

    function speedChangedYou() {
        speedYou = changeSpeedYou
    }

    function updateSpeedYou(speed) {
        changeSpeedYou += speed
    }
}