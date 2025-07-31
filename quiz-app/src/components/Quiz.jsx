import React from 'react';
import { Question } from "./Question"
import { useEffect, useState } from "react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Confetti from "react-confetti"


export function Quiz() {

    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [gameCount, setGameCount] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        async function getQuestions() {
            const response = await fetch("https://opentdb.com/api.php?amount=5");
            const data = await response.json();
            setQuestions(data.results);
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

    function renderScoreSection() {
        if (userAnswers.length === 0) {
            return <button >Check Answers</button>;
        }
        return (
            <section className="score-section">
                <p className="score">You scored {score}/{questions.length} answers</p>
                <button onClick={newGame}>Play Again</button>
            </section>
        );
    }

    function handleSubmit(formData) {
        const data = Object.fromEntries(formData);  // turn formdata into js object ex output (question 1: <selected answer>, question 2: <selected answer>...)
        setUserAnswers(Object.values(data));  // turn that object into an array of the values so only the users selected answers ex [<selected answer>, <selected answer>, <selected answer>...]
        const score = Object.values(data).reduce((acc, answer, index) => {
            if(answer === questions[index].correct_answer) {
                acc++;
            }
            return acc;
        }, 0);
        setScore(score);
        setShowResults(true);
    }

    function newGame() {
        setGameCount(prevGameCount => prevGameCount + 1)  // length of array could be game count
        setShowResults(false);
        setUserAnswers([]);
        setScore(0);
    }


    return (
        <section className="quiz-section">
            <h2 className="game-count">Round: {gameCount + 1}</h2>
            {questions.length > 0 ? 
            <form action={handleSubmit}>
                {questionElements}
                {renderScoreSection()}
            </form> : 
            <DotLottieReact
            src="/loading.lottie"
            loop
            autoplay
          />}
          {score === questions.length ? <Confetti /> : undefined}
        </section>   
    )
}