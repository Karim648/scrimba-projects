import { Question } from "./Question"
import { Loading } from "./Loading";
import { useEffect, useState } from "react"

export function Quiz() {

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        async function getQuestions() {
            const response = await fetch("https://opentdb.com/api.php?amount=5");
            const data = await response.json();
            setQuestions(data.results);
        }
        getQuestions();
    }, [])

    

    const questionElement = questions.map((question, index) => (
        <Question key={index} question={questions[index]} />
    ))
    

    return (
        <section className="quiz-section">
            {questions.length > 0 ? questionElement : <Loading />}
            {questions.length > 0 ? <button>Check Answers</button> : undefined}
        </section>   
    )
}