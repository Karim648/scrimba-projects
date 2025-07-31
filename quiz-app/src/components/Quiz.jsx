import { Question } from "./Question"
import { Loading } from "./Loading";
import { useEffect, useState } from "react"
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function Quiz() {

    const [questions, setQuestions] = useState([]);

    // state holding array of selected answers
    const [userAnswers, setUserAnswers] = useState([]);

    // derived answers 
    const answers = questions.map(question => question.correct_answer);

    // i think creating a state for scoremsg is bad practice and theres gotta be a better way but try for now
    const [scoreMsg, setScoreMsg] = useState("");

    // also might not need this state but works for now to get new game and keep track of count
    const [gameCount, setGameCount] = useState(0);

    // state holding wether we are in checking mode or not 
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        async function getQuestions() {
            const response = await fetch("https://opentdb.com/api.php?amount=5");
            const data = await response.json();
            setQuestions(data.results);
            console.log("in getQuestions");
        }
        getQuestions();
    }, [gameCount])

    const questionElements = questions.map((question, index) => (
        <Question 
            key={index} 
            question={questions[index]} 
            id={index}
            showResults={showResults}
            userAnswer={userAnswers[index]}
            correctAnswer={questions[index].correct_answer}
        />
    ))

    function handleSubmit(formData) {
        const data = Object.fromEntries(formData);  // turn formdata into js object ex output (question 1: <selected answer>, question 2: <selected answer>...)
        setUserAnswers(Object.values(data));  // turn that object into an array of the values so only the users selected answers ex [<selected answer>, <selected answer>, <selected answer>...]
        const userAnswers = Object.values(data);
        const score = userAnswers.reduce((acc, answer, index) => {
            if(answer === answers[index]) {
                acc++;
            }
            return acc;
        }, 0);
        setScoreMsg(`You scored ${score} / ${answers.length} correct answers`);
        setShowResults(true);
    }

    function newGame() {
        setGameCount(prevGameCount => prevGameCount + 1)  // length of array could be game count
        setShowResults(false);
        setUserAnswers([]);
    }

    return (
        <section className="quiz-section">
            {questions.length > 0 ? 
            <form action={handleSubmit}>
                {questionElements}
                {userAnswers.length > 0 ? 
                <section className="score-section">
                    <p className="score">{scoreMsg}</p>
                    <button onClick={newGame}>Play Again</button>
                </section> : 
                <button>Check Answers</button>}
            </form> : 
            <DotLottieReact
            src="/loading.lottie"
            loop
            autoplay
          />}
        </section>   
    )
}