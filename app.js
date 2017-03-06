$(document).ready(function() {
    // Hinding Categories, Categories logo, Question and Answers
    $('.navbar').addClass('hide')
    $('.catLogo').addClass('hide')
    $('.catBtns').addClass('hide')
    $('#container').addClass('hide')

    // Play button to start game, showing Categories logo and choices
    $("#play").click(function() {
        $("#logo").addClass('hide')
        $("#howTo").addClass('hide')
        $("#play").addClass('hide')
        $(".catLogo").removeClass('hide')
        $(".catBtns").removeClass('hide')
        $('.navbar').removeClass('hide')
    })

    // all Category buttons fadding in, and fading out the animated beer mug
    $(".catBtns").click(function() {
        $(".catLogo").addClass('hide')
        $(".catBtns").addClass('hide')
        $('#container').removeClass('hide')
        $("#container").fadeOut(3000)
        $("#questions").fadeIn(8000)
    })

    $(".catBtns").click(function() {
        let value = $(this).val()

        $.ajax({
                url: `https://opentdb.com/api.php?amount=25&category=${value}`,
                dataType: 'json'
            })
            .then(function(questions) {
                let index = 0;
                makeQuestion(index);

                function makeQuestion(a) {
                    let results = questions.results
                    let question = questions.results[a];
                    console.log(question);
                    let answersArr = [];
                    let questionTitle = $('<h1 id="qlogo">Question</h1><br>')
                    let questionOutput = $(`<h1>${question.question}</h1><br>`)
                    let correctAnswer = $(`<button id="correctAnswer" class="hvr-glow correctAnswer">${question.correct_answer}</button><br>`)
                    let incorrectAnswer1 = $(`<button class="hvr-glow incorrectAnswer">${question.incorrect_answers[0]}</button><br>`)

                    answersArr.push(correctAnswer, incorrectAnswer1);
                    if (question.incorrect_answers.length > 1) {
                        let incorrectAnswer2 = $(`<button class="hvr-glow incorrectAnswer">${question.incorrect_answers[1]}</button><br>`)
                        let incorrectAnswer3 = $(`<button class="hvr-glow incorrectAnswer">${question.incorrect_answers[2]}</button><br>`)

                        answersArr.push(incorrectAnswer2, incorrectAnswer3);
                    }

                    // replacing the old question with a new question
                    $('#questions').empty();

                    // appending the question logo and the actual question
                    $('#questions').append(questionTitle, questionOutput);
                    let finalArr = [];

                    // randomizing the array of answers for a random append
                    for (var i = 0; i < answersArr.length; i++) {
                        let randomPosition = Math.floor(Math.random() * answersArr.length);

                        finalArr.push(answersArr[randomPosition])
                        answersArr.splice(randomPosition, 1);
                        i--;
                    }

                    // appending final array which is a gumble of the answers
                    for (let i = 0; i < finalArr.length; i++) {
                        $('#questions').append(finalArr[i]);
                    }


                    $('.incorrectAnswer').click(function() {
                        $('.incorrectAnswer').addClass('wrong')
                        $('.correctAnswer').addClass('right')
                        setTimeout(function() {
                            drinkUp()
                        }, 2000)

                    })

                    function appendDrink() {
                        $('#correctAnswerDiv').children().remove()
                        $('#correctAnswerDiv').append(`<h2 class='text-center' id="rightAnswer">Answer: ${question.correct_answer}</h2>`).fadeIn(5000).fadeOut(5000)
                    }

                    function appendDrinkup() {
                        $('.appendRight').children().remove()
                        $('.appendRight').append("<h1 class='text-center'>Drink Until The Beer Disappears</h1>").fadeIn(5000).fadeOut(5000)
                    }

                    function drinkUp() {
                        $("#questions").fadeOut(4000)
                        $('#container').fadeIn(9000).fadeOut(1000)
                        $('#questions').addClass('hide')

                        setTimeout(function() {
                            $('#questions').fadeIn(13000).removeClass('hide')
                        }, 8000);
                        index++
                        appendDrinkup()
                        appendDrink()
                        makeQuestion(index)
                    }

                    // appending a new qestion if the answer was correct
                    $('#correctAnswer').click(function() {
                        $('#questions').addClass('hide')
                        index++

                        makeQuestion(index)

                        $('#questions').removeClass('hide')
                    })

                    // ends makesQuestion function
                }

                // ends then function
            })

        // ends category buttons
    })

    // beer start
    // start poruing
    $('.pour').delay(1000).animate({
        height: '360px'
    }, 1500).delay(1600).slideUp(500);

    // filling up the glass
    $('#liquid').delay(2400).animate({
        height: '170px'
    }, 1500);

    // beer foam moving with the beer
    $('.beer-foam').delay(2400).animate({
        bottom: '200px'
    }, 1500);

    // end of document.ready()
})
