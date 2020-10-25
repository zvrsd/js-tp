var questions = [
    
    {
        question: 'Aimez-vous le javascript ?',
        answer: 'oui'
    },
    
    {
        question: 'JS est-il une evo de java ?',
        answer: 'non'
    },
    
    {
        question: 'JS est il proche de java',
        answer: 'non'
    },
    
    {
        question: 'JS est un language d\'objet par prototypage',
        answer: 'oui'
    },
    
    {
        question: 'JS est souvent utilisé coté client ?',
        answer: 'ouis'
    },
];
var score = 0;
var msg = "Vous allez commencer un questionnaire. Repondez uniquement en tappant oui ou non";
var resutMessage = ''

// Displays basic rules
alert(msg);

// Loops over question and check em
for(i=0; i < questions.length; i++){
    
    currentQuestion = questions[i].question;
    correctAnswer = questions[i].answer;
    userAnswer = prompt("Question : "+questions[i].question).toLowerCase();
    
    // Prints the current question, user and correct answer on console
    console.log('question : '+currentQuestion);
    console.log('user answer : '+userAnswer);
    console.log('correct answer : '+correctAnswer);
    
    // Updates the score
    score = userAnswer == questions[i].answer ? ++score : score;
    console.log("note : "+score);
}

// Max score
if(score == questions.length){
    resutMessage = 'Incroyable ! Vous n\'avez fait aucune erreur !';
}
// Above average
else if(score > questions.length / 2){
    resutMessage = 'Pas mal, mais vous pouvez vous ameliorer !';
}
// Below average
else if(score < questions.length / 2){
    resutMessage = 'Dommage. Vous ferez mieux la prochaine fois !';
}
// No correct answer
else if(score == 0){
    resutMessage = 'Aucune bonne réponse, vous n\'y connaissez rien !!';
}

alert('Vous avez eu '+score+' réponses correctes sur '+questions.length+' !\n'+resutMessage);