// variables
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var lettersPicked = []

var categoryHeaders = document.querySelectorAll(".category-Header")

var categories = ["Chemicals", "Names", "Countries", "Books In The Bible"]
var letterSelector = document.querySelectorAll(".letter")
var roundNum = 0

var selectedCategory = []
var noLetters = []
var sendButton = document.getElementById("send-Button")
var noErrors = null
var answers = []

var nextRoundRun = false

var rowNum1 = document.querySelectorAll(".row-Num-One")
var rowNum2 = document.querySelectorAll(".row-Num-Two")
var rowNum3 = document.querySelectorAll(".row-Num-Three")
var rowNum4 = document.querySelectorAll(".row-Num-Four")
var rowNum5 = document.querySelectorAll(".row-Num-Five")

var score = 0

var waitingUsers = []

var allAnswers = [[], [], [], [], []]

var yourTurn = false

var opponentName = ""

var opponentsScore = 0
var scoreUpdated = false

const firebaseConfig = {
    apiKey: "AIzaSyAIvg1mPJ-_98qdTgtsTklNIiqmrl9SWe8",
    authDomain: "categories52.firebaseapp.com",
    projectId: "categories52",
    storageBucket: "categories52.appspot.com",
    messagingSenderId: "842920820272",
    appId: "1:842920820272:web:7d8a4fb6a61a49441977f5",
    measurementId: "G-10N3YM5LW8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var player1 = null

var firstTimeWaiting = true

// var myName = localStorage.getItem("myName")

// if(myName == undefined)
// {
var myName = prompt("Enter your name: ")
//     localStorage.setItem("myName", myName)
// }



firebase.database().ref("TDSB/Categories/Waiting").once('value', function(snapshot) 
{
    snapshot.forEach(
        function(ChildShapshot) {
            var name = ChildShapshot.val().Name
            var doneWaiting = ChildShapshot.val().doneWaiting
            if(!doneWaiting)
            {
                waitingUsers.push(name.toLowerCase())
            }
        }
    )
    if(waitingUsers.length == 0) 
    {
        firebase.database().ref("TDSB/Categories/Waiting/" + myName).set(
        {
            "Name": myName,
            "Other_Player":false,
            "doneWaiting":false
        }
        )

        player1 = true

        for(var i=0;i<4;i++) 
        {
            selectedCategory.push(selectCategories())
            categoryHeaders[i + 1].textContent = selectedCategory[i]
        }

        for(var i=0;i<5;i++) 
        {
            lettersPicked.push(selectLetter(selectedCategory))
        } 

        firebase.database().ref("TDSB/Categories/Games/" + myName + "'s Game").set(
        {
            "categories":selectedCategory,
            "player_one_score":0,
            "player_two_score":0,
            "letters":lettersPicked,
            "round_num":0,
            "players_turn":myName
        }
        )

        findingOpponent()
    }

    else if(waitingUsers.length > 0)
    
    {
        yourTurn = false
        player1 = false
        opponentName = waitingUsers[0]

        var refSpot = "TDSB/Categories/Waiting/"+title(waitingUsers[0])
        firebase.database().ref(refSpot).update({
            "Name":myName,
            "Other_Player":true,
            "doneWaiting":true
        })
        nextRound()
        waitingForOpponent()
    }
}
)

if(waitingUsers.length == 0)
{
    yourTurn = true
    if(opponentName == "")
    {
        firebase.database().ref("TDSB/Categories/Waiting/" + title(myName)).on("child_changed", function(snapshot) 
        {
            if(snapshot.val() == true)
            {
                doneFindingOpponent()  
                firebase.database().ref("TDSB/Categories/Waiting/" + title(myName)).on("value", function(snapshot1)
                {
                    opponentName = snapshot1.val().Name
    
                    firebase.database().ref()
                })
    
                firebase.database().ref("TDSB/Categories/Waiting/" + title(myName)).on("value", function(snapshot1)
                {
                    opponentName = snapshot1.val().Name
                })
    
                firebase.database().ref("TDSB/Categories/Waiting/").remove()
    
                nextRound()
            }
        }
        )
    }
}


if(player1 == true)
{
    firebase.database().ref("TDSB/Categories/Games/" + title(myName) + "'s Game/").on("child_changed", function(snapshot) 
    {
        if(opponentName == "")
        {
            roundNum = round_num
        }
    })
}











// functions
function selectLetter(array) 
{
    if(array.includes("Chemicals")) 
    {
        for(var i=0;i<noLettersChemicals.length;i++) 
        {
            if(!noLetters.includes(noLettersChemicals[i])) 
            {
                noLetters.push(noLettersChemicals[i])
            }
        }
    } 
    
    if(array.includes("Countries")) 
    {
        for(var i=0;i<noLettersCountries.length;i++) 
        {
            if(!noLetters.includes(noLettersCountries[i])) 
            {
                noLetters.push(noLettersCountries[i])
            }
        }
    }
    
    if(array.includes("Books In The Bible")) 
    {
        for(var i=0;i<noLettersBibleBooks.length;i++) 
        {
            if(!noLetters.includes(noLettersBibleBooks[i])) 
            {
                noLetters.push(noLettersBibleBooks[i])
            }
        }
    }


    var random = Math.floor((Math.random() * letters.length) + 0);

    if(!noLetters.includes(letters[random]) && !lettersPicked.includes(letters[random])) 
    {
        return letters[random]
    } 
    
    else 
    
    {
        return selectLetter(selectedCategory)
    }
}


function selectCategories() 
{
    var random = Math.floor((Math.random() * categories.length) + 0);
    // return categories[random]
    // alert(categories[random])
    // alert(selectedCategory)

    if(!selectedCategory.includes(categories[random])) 
    {
        return categories[random]
    } 
    
    else 
    
    {
        return selectCategories()
    }
}


function gameError(errorText) 
{
    noErrors = false
    var errorNotification = document.createElement("div")
    errorNotification.textContent = errorText
    errorNotification.classList.add("show-Error")

    document.getElementById("error-Holder").appendChild(errorNotification)
    setTimeout(function() {
        document.getElementById("error-Holder").removeChild(errorNotification)
    }, 5500)
}

function title(sentence)
{
    var words = sentence.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(" ");
}


function calcScore(word) {
    word = word.split("")
    for(var i=0;i<word.length;i++)
    {
        score++
    }
}


function sendGame()
{
    if(player1 && roundNum < 5 || !player1 && roundNum <= 5)
    {
        nextRoundRun = false
        scoreUpdated = false
        noErrors = true
        var noText = false
    
        for(var i=0;i<textBoxes.length;i++)
        {
            if(textBoxes[i].value == "")
            {
                noText = true
            }
        }
    
        if(!noText)
        {
            if(selectedCategory.includes("Chemicals"))
            {
                var ChemicalsValue = textBoxes[selectedCategory.indexOf("Chemicals")].value
                var firstLetter = ChemicalsValue.charAt(0).toUpperCase();
                ChemicalsValue = title(ChemicalsValue)
                if(firstLetter != lettersPicked[roundNum])
                {
                    gameError("Error - The Chemical '" + ChemicalsValue + "' Is Not '" + lettersPicked[roundNum] + "'.")
                }
    
                else 
    
                {
                    if(Chemicals.includes(ChemicalsValue))
                    {
                        // alert("Correct")
                        var rowAnswers = []
                        for(var i=0;i<textBoxes.length;i++)
                        {
                            rowAnswers.push(textBoxes[i].value)
                        }
                        answers.push(rowAnswers)
                    }
                    
                    else
    
                    {
                        gameError("Error - First Letter In The Word '" + ChemicalsValue + "' Is Not A Element On The Periodic Table.")
                    }
                }
            } 
            
            if(selectedCategory.includes("Names"))
            
            {
                var NamesValue = textBoxes[selectedCategory.indexOf("Names")].value
                var firstLetter = NamesValue.charAt(0).toUpperCase();
                NamesValue = title(NamesValue)
                if(firstLetter != lettersPicked[roundNum])
                {
                    gameError("Error - The Word '" + NamesValue + "' Is Not '" + lettersPicked[roundNum] + "'.")
                }
    
                else 
    
                {
                    if(names.includes(NamesValue))
                    {
                        // alert("Correct")
                        var rowAnswers = []
                        for(var i=0;i<textBoxes.length;i++)
                        {
                            rowAnswers.push(textBoxes[i].value)
                        }
                        answers.push(rowAnswers)
                    }
                    
                    else
    
                    {
                        gameError("Error - The Name '" + NamesValue + "' Is Not A Name In Our Database.")
                        // alert("Incorrect")
                    }
                }        
            }
    
            if(selectedCategory.includes("Countries"))
            
            {
                var CountriesValue = textBoxes[selectedCategory.indexOf("Countries")].value
                var firstLetter = CountriesValue.charAt(0).toUpperCase();
                CountriesValue = title(CountriesValue)
                if(firstLetter != lettersPicked[roundNum])
                {
                    gameError("Error - First Letter In The Word '" + CountriesValue + "' Is Not '" + lettersPicked[roundNum] + "'.")
                }
    
                else 
    
                {
                    if(Countries.includes(CountriesValue))
                    {
                        // alert("Correct")
                        var rowAnswers = []
                        for(var i=0;i<textBoxes.length;i++)
                        {
                            rowAnswers.push(textBoxes[i].value)
                        }
                        answers.push(rowAnswers)
                    }
                    
                    else
    
                    {
                        gameError("Error - The Country '" + CountriesValue + "' Is Not A Country.")
                        // alert("Incorrect")
                    }
                }          
            }
    
            if(selectedCategory.includes("Books In The Bible"))
            
            {
                var BibleBooksValue = textBoxes[selectedCategory.indexOf("Books In The Bible")].value
                var firstLetter = BibleBooksValue.charAt(0).toUpperCase();
                BibleBooksValue = title(BibleBooksValue)
                if(firstLetter == lettersPicked[roundNum])
                {
                    if(bibleBooks.includes(BibleBooksValue))
                    {
                        // alert("Correct")
                        var rowAnswers = []
                        for(var i=0;i<textBoxes.length;i++)
                        {
                            rowAnswers.push(textBoxes[i].value)
                        }
                        answers.push(rowAnswers)
                    }
                    
                    else
    
                    {
                        // alert(BibleBooksValue)
                        gameError("Error - The Word '" + BibleBooksValue + "' Is Not A Book In The Bible.")
                        // alert("Incorrect")
                    }
                }
                
                else if(firstLetter == "1" || firstLetter == "2" || firstLetter == "3")
                
                {
                    if(BibleBooksValue.charAt(1).toUpperCase() != lettersPicked[roundNum] && BibleBooksValue.charAt(2).toUpperCase() != lettersPicked[roundNum])
                    {
                        // alert(BibleBooksValue.charAt(2).toUpperCase())
                        gameError("Error - First Letter In The Word '" + BibleBooksValue + "' Is Not '" + lettersPicked[roundNum] + "'.")
                    }
    
                    else
    
                    {
                        if(bibleBooks.includes(BibleBooksValue))
                        {
                            // alert("Correct")
                            var rowAnswers = []
                            for(var i=0;i<textBoxes.length;i++)
                            {
                                rowAnswers.push(textBoxes[i].value)
                            }
                            answers.push(rowAnswers)
                        }
                        
                        else
        
                        {
                            gameError("Error - The Book '" + BibleBooksValue + "' Is Not A Book In The Bible.")
                            // alert("Incorrect")
                        }
                    }
                }
    
                else
    
                {
                    gameError("Error - First Letter In The Word '" + BibleBooksValue + "' Is Not '" + lettersPicked[roundNum] + "'.")      
                }
            }
    
            
            if(noErrors)
            {
                for(var i=0;i<textBoxes.length;i++)
                {
                    answers.push(textBoxes[i].value)
                    calcScore(textBoxes[i].value)
                }
                alert(answers)

                if(player1 && roundNum <= 1)
                {        
                    firebase.database().ref("TDSB/Categories/Games/"+title(myName)+"'s Game/").update(
                    {
                        "player_one_score":score
                    })
                }

                else if(player1)

                {
                    firebase.database().ref("TDSB/Categories/Games/"+title(myName)+"'s Game/").update(
                    {
                        "player_one_score":score
                    })
                }

                else if(!player1)

                {
                    firebase.database().ref("TDSB/Categories/Games/"+title(opponentName)+"'s Game/").update(
                    {
                        "player_two_score":score
                    })
            
                    document.getElementById("opponent-Points-Count").textContent = opponentsScore
                }
                
                roundNum++

                if(roundNum > 0)
                {
                    firebase.database().ref("TDSB/Categories/Games/"+title(opponentName)+"'s Game/").on("value", function(snapshot)
                    {
                        if(!scoreUpdated)
                        {
                            opponentsScore = snapshot.val().player_one_score
                            document.getElementById("opponent-Points-Count").textContent = opponentsScore
                            scoreUpdated = true
                        }
                    })
                }
    
                if(roundNum < 5 && !player1)
                {
                    waitingForOpponent()
                }

                else if(roundNum <= 5 && player1)
                
                {
                    waitingForOpponent()
                }
    
                if(player1 == true)
                {    
                    firebase.database().ref("TDSB/Categories/Games/"+title(myName)+"'s Game/").update(
                    {
                        "players_turn":title(opponentName)
                    })

                    if(roundNum == 1)
                    {
                        firebase.database().ref("TDSB/Categories/Games/" + title(myName) + "'s Game/" + title(myName) + "'s Answers/").set({
                            "1": answers[0],
                        })
                        answers = []
                    }

                    else if(roundNum == 2)
                    
                    {
                        firebase.database().ref("TDSB/Categories/Games/" + title(myName) + "'s Game/" + title(myName) + "'s Answers/").update({
                            "2": answers[0],
                        })
                        answers = []
                    }

                    else if(roundNum == 3)
                    
                    {
                        firebase.database().ref("TDSB/Categories/Games/" + title(myName) + "'s Game/" + title(myName) + "'s Answers/").update({
                            "3": answers[0],
                        })
                        answers = []
                    }

                    else if(roundNum == 4)
                    
                    {
                        firebase.database().ref("TDSB/Categories/Games/" + title(myName) + "'s Game/" + title(myName) + "'s Answers/").update({
                            "4": answers[0],
                        })
                        answers = []
                    }

                    else

                    {
                        firebase.database().ref("TDSB/Categories/Games/" + title(myName) + "'s Game/" + title(myName) + "'s Answers/").update({
                            "5": answers[0],
                        })
                        answers = []
                    }

                    
                    // "1": answers,
                    // "2": answers,
                    // "3": answers,
                    // "4": answers,
                    answers = []
                }
    
                else
    
                {    
                    firebase.database().ref("TDSB/Categories/Games/"+title(opponentName)+"'s Game/").update(
                    {
                        "players_turn":title(opponentName)
                    })
    
                    firebase.database().ref("TDSB/Categories/Games/"+title(opponentName)+"'s Game/").update(
                    {
                        "round_num":roundNum
                    })

                    firebase.database().ref("TDSB/Categories/Games/" + title(opponentName) + "'s Game/" + title(myName) + "'s Answers/").set({
                        "0": allAnswers[0],
                        "1": allAnswers[1],
                        "2": allAnswers[2],
                        "3": allAnswers[3],
                        "4": allAnswers[4],
                    })
                    answers = []
                }

                if(roundNum == 5 && !player1)
                {
                    firebase.database().ref("TDSB/Categories/Games/" + title(opponentName) + "'s Game/").on('value', function(snapshot)
                    {
                        var opponentsScore = snapshot.val().player_one_score
                        console.log(opponentsScore)
                        console.log("score calculated")

                        if(opponentsScore > score)
                        {
                            console.log("You Lose")
                            youLose()
                        }

                        else if(opponentsScore < score)
                        
                        {
                            console.log("You Win")
                            youWin()
                        }

                        else if(opponentsScore == score)

                        {
                            console.log("You Tied")
                            youTied()
                        }
                    })
                }
                document.getElementById("your-Points-Count").textContent = score
            }
        }
    
        else
        
        {
            gameError("Error - Please Fill In All The Text Fields In Row '" + lettersPicked[roundNum] + "'.")
        }
    }
}


function updateEventlisteners(textBoxes) 
{
    // Event Listeners
    textBoxes[0].addEventListener(
        "keyup", function() 
    {
        var textIn = true
        for(var i=0;i<textBoxes.length;i++)
        {
            if(textBoxes[i].value == "")
            {
                textIn = false
            }
        }
    
        if(textIn) 
        {
            sendButton.classList.add("active")
        }
    
        else
        
        {
            sendButton.classList.remove("active")    
        }
    }
    )
    
    textBoxes[1].addEventListener(
        "keyup", function() 
    {
        var textIn = true
        for(var i=0;i<textBoxes.length;i++)
        {
            if(textBoxes[i].value == "")
            {
                textIn = false
            }
        }
    
        if(textIn) 
        {
            sendButton.classList.add("active")
        }
    
        else

        {
            sendButton.classList.remove("active")    
        }
    }
    )
    
    textBoxes[2].addEventListener(
        "keyup", function() 
    {
        var textIn = true
        for(var i=0;i<textBoxes.length;i++)
        {
            if(textBoxes[i].value == "")
            {
                textIn = false
            }
        }
    
        if(textIn) 
        {
            sendButton.classList.add("active")
        }
    
        else

        {
            sendButton.classList.remove("active")    
        }
    }
    )
    
    textBoxes[3].addEventListener(
        "keyup", function() 
    {
        var textIn = true
        for(var i=0;i<textBoxes.length;i++)
        {
            if(textBoxes[i].value == "")
            {
                textIn = false
            }
        }
    
        if(textIn) 
        {
            sendButton.classList.add("active")
        }
    
        else
        
        {
            sendButton.classList.remove("active")    
        }
    }
    )

    if(player1 == false)
    {
        // alert("Updated")
    }
}




function findingOpponent() 
{
    document.getElementById("finding-Opponent").style.zIndex = "1"
    document.getElementById("finding-Opponent").style.opacity = "1"
    
    var dotCount = 1
    setInterval(function()
    {
        if(dotCount == 1)
        {        
            document.getElementById("finding-Opponent").textContent = "Finding Opponent."
            dotCount++
        }

        else if(dotCount == 2)

        {        
            document.getElementById("finding-Opponent").textContent = "Finding Opponent.."
            dotCount++
        }

        else if(dotCount == 3)
        
        {
            document.getElementById("finding-Opponent").textContent = "Finding Opponent..."
            dotCount++
            dotCount = 1
        }
    }, 500)
}


function doneFindingOpponent() 
{
    document.getElementById("finding-Opponent").style.opacity = "0"
    document.getElementById("finding-Opponent").style.zIndex = "-1"
}



function waitingForOpponent() 
{
    document.getElementById("waiting-For-Opponent").style.zIndex = "1"
    document.getElementById("waiting-For-Opponent").style.opacity = "1"

    if(player1 == true)
    {
        firebase.database().ref("TDSB/Categories/Games/"+title(myName)+"'s Game/").on("child_changed", function(snapshot)
        {
            if(snapshot.val() == title(myName))
            {
                doneWaitingForOpponent()
                nextRound()
            }
        })
    }

    else

    {    
        firebase.database().ref("TDSB/Categories/Games/"+title(opponentName)+"'s Game/").on("child_changed", function(snapshot)
        {
            if(snapshot.val() == title(myName))
            {
                doneWaitingForOpponent()
                nextRound()
            }
        })
    }

    if(firstTimeWaiting)
    {
        var dotCount = 1
        setInterval(function()
        {
            if(dotCount == 1)
            {        
                // finding-Opponent
                document.getElementById("waiting-For-Opponent").textContent = "Waiting For Opponent."
                dotCount++
            }

            else if(dotCount == 2)

            {        
                document.getElementById("waiting-For-Opponent").textContent = "Waiting For Opponent.."
                dotCount++
            }

            else if(dotCount == 3)
            
            {
                document.getElementById("waiting-For-Opponent").textContent = "Waiting For Opponent..."
                dotCount++
                dotCount = 1
            }
        }, 500)
        firstTimeWaiting = false
    }
}

function doneWaitingForOpponent() 
{
    document.getElementById("waiting-For-Opponent").style.opacity = "0"
    document.getElementById("waiting-For-Opponent").style.zIndex = "-1"

    if(roundNum > 0 && player1)
    {
        scoreUpdated = false
        setTimeout(function() {
            firebase.database().ref("TDSB/Categories/Games/"+title(myName)+"'s Game/").on("value", function(snapshot)
            {
                if(!scoreUpdated)
                {
                    console.log("score updated")
                    opponentsScore = snapshot.val().player_two_score
                    document.getElementById("opponent-Points-Count").textContent = opponentsScore
                    scoreUpdated = true
                }
            })
        }, 1000)
    }
}

function updateTextBoxesValue() {
    if(roundNum > 0) 
    {
        if(roundNum == 1) 
        {
            for(var i=0;i<rowNum1.length;i++) 
            {
                rowNum1[i].innerHTML = textBoxes[i].value
                console.log(textBoxes[i].value)
            }
            for(var i=0;i<rowNum2.length;i++)
            {
                rowNum2[i].innerHTML = '<input type="text" class="text-Box-Category-Option">'
            }
        }

        else if(roundNum == 2) 
        
        {
            for(var i=0;i<rowNum2.length;i++) 
            {
                rowNum2[i].innerHTML = textBoxes[i].value
                console.log(textBoxes[i].value)
            }

            for(var i=0;i<rowNum3.length;i++)
            {
                rowNum3[i].innerHTML = '<input type="text" class="text-Box-Category-Option">'
            }
        }
        
        else if(roundNum == 3) 
        
        {
            for(var i=0;i<rowNum3.length;i++) 
            {
                rowNum3[i].innerHTML = textBoxes[i].value
                console.log(textBoxes[i].value)
            }

            for(var i=0;i<rowNum4.length;i++)
            {
                rowNum4[i].innerHTML = '<input type="text" class="text-Box-Category-Option">'
            }
        }
        
        else if(roundNum == 4) 
        
        {
            for(var i=0;i<rowNum4.length;i++) 
            {
                rowNum4[i].innerHTML = textBoxes[i].value
                console.log(textBoxes[i].value)
            }

            for(var i=0;i<rowNum5.length;i++)
            {
                rowNum5[i].innerHTML = '<input type="text" class="text-Box-Category-Option">'
            }
        }

        else if(roundNum == 5) 
        
        {
            for(var i=0;i<rowNum5.length;i++) 
            {
                rowNum5[i].innerHTML = textBoxes[i].value
                console.log(textBoxes[i].value)
            }
        }
        
    }

    if(player1 == false)
    {
        // alert(roundNum)
    }
}


var dataGot = false

function nextRound() 
{
    console.log("Next Round")
    if(roundNum < 5)
    {
        if(!nextRoundRun)
        {
            textBoxes = document.querySelectorAll(".text-Box-Category-Option")
            updateTextBoxesValue()
            updateEventlisteners(textBoxes)
            console.log(roundNum)
            console.log(lettersPicked[roundNum])
            letterSelector[roundNum].textContent = lettersPicked[roundNum]
            nextRoundRun = true
        }


        if(player1 == false) {

            if(roundNum == 0) {
                // alert(roundNum)
                firebase.database().ref("TDSB/Categories/Games/"+title(opponentName)+"'s Game/").on("value", function(snapshot) 
                {
                    if(roundNum == 0 && dataGot == false) {
                        for(var i=0;i<snapshot.val().categories.length;i++)
                        {
                            selectedCategory.push(snapshot.val().categories[i])
                        }
                        for(var i=0;i<selectedCategory.length;i++) 
                        {
                            categoryHeaders[i + 1].textContent = selectedCategory[i]
                        }

                        for(var i=0;i<snapshot.val().letters.length;i++)
                        {
                            lettersPicked.push(snapshot.val().letters[i])
                        }

                        letterSelector[roundNum].textContent = lettersPicked[roundNum]
                        dataGot = true
                    }

                    else if(roundNum == 0 && dataGot == true)
                    
                    {
                        doneWaitingForOpponent()
                    }
                }
                )
            }

            else

            {
                // alert(letterSelector[roundNum], lettersPicked[roundNum])
                letterSelector[roundNum].textContent = lettersPicked[roundNum]
                sendButton.classList.remove("active")
                textBoxes = document.querySelectorAll(".text-Box-Category-Option")
                updateEventlisteners(textBoxes) 
            }
        }

        else

        {
            // alert(letterSelector[roundNum], lettersPicked[roundNum])
            letterSelector[roundNum].textContent = lettersPicked[roundNum]
            sendButton.classList.remove("active")
            textBoxes = document.querySelectorAll(".text-Box-Category-Option")
            updateEventlisteners(textBoxes) 
        }
        // // alert(roundNum)
    }

    else

    {
        if(player1)
        {
            firebase.database().ref("TDSB/Categories/Games/" + title(myName) + "'s Game/").on('value', function(snapshot)
            {
                var opponentsScore = snapshot.val().player_two_score
                console.log(opponentsScore)

                if(opponentsScore > score)
                {
                    console.log("You Lose")
                    youLose()
                }

                else if(opponentsScore < score)
                
                {
                    console.log("You Win")
                    youWin()
                }

                else if(opponentsScore == score)

                {
                    console.log("You Tied")
                    youTied()
                }
            })
        }
    }
}

function youLose() 
{
    document.getElementById("top-Text").textContent = title(opponentName) + " Won"
    document.getElementById("end-Screen").style.zIndex = "1"
    document.getElementById("end-Screen").style.opacity = "1"
    
    document.getElementById("your-Score-End-Screen").textContent = score
    document.getElementById("opponent-Score-End-Screen").textContent = opponentsScore

    document.getElementById("new-Game").style.zIndex = "1"
    document.getElementById("new-Game").style.opacity = "1"

    if(player1)
    {
        firebase.database().ref("TDSB/Categories/Games/" + title(myName) + "'s Game").remove()
    }

}

function youWin() 
{
    document.getElementById("top-Text").textContent =  "You Won"
    document.getElementById("end-Screen").style.zIndex = "1"
    document.getElementById("end-Screen").style.opacity = "1"

    document.getElementById("your-Score-End-Screen").textContent = score
    document.getElementById("opponent-Score-End-Screen").textContent = opponentsScore

    document.getElementById("new-Game").style.zIndex = "1"
    document.getElementById("new-Game").style.opacity = "1"

    if(player1)
    {
        firebase.database().ref("TDSB/Categories/Games/" + title(myName) + "'s Game").remove()
    }
}

function youTied() 
{
    document.getElementById("top-Text").textContent = "You & " + title(opponentName) + " Tied"
    document.getElementById("end-Screen").style.zIndex = "1"
    document.getElementById("end-Screen").style.opacity = "1"

    document.getElementById("your-Score-End-Screen").textContent = score
    document.getElementById("opponent-Score-End-Screen").textContent = opponentsScore

    document.getElementById("new-Game").style.zIndex = "1"
    document.getElementById("new-Game").style.opacity = "1"


    if(player1)
    {
        firebase.database().ref("TDSB/Categories/Games/" + title(myName) + "'s Game").remove()
    }
}

function newGame() 
{
    window.location.reload()
}


// main