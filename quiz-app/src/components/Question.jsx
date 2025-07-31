import he from "he";
import clsx from "clsx";
import { useMemo } from "react";

export function Question({ question, id, showResults, userAnswer }) {

    const decodedQuestion = he.decode(question.question);
    const questionNum = `Question ${(id + 1)}`;

    // shuffle algorithm
    function shuffle(arr) {
        const copy = [...arr];  // safer for react best practices to make it a pure function with no side effects should not mutate props props should be immutable 
        for (let i = copy.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
        }
        return copy;
    }
    
    const shuffledAnswers = useMemo(() => {  // answers only shuffle once per new question
        const answers = [...question.incorrect_answers, question.correct_answer];  // combine incorrect answers and correct answers into one array
        return shuffle(answers);
    }, [question])  // dependancy array shuffle function will only run if question changes not on rerender of page/component

    const mixedQuestions = shuffledAnswers.map((answer, index) => (
        <label 
            key={index}
            className={clsx ({  // whatever condition is true the key will be the class name
                correct: showResults && answer === question.correct_answer,  
                wrong: showResults && answer === userAnswer && answer !== question.correct_answer  
            })}
        >
        {he.decode(answer)}
            <input 
                type="radio" 
                name={questionNum} 
                id={questionNum} 
                value={answer}
            />
        </label>
    ))

    return (
        <section className="question-section">
            <h2 className="question">{decodedQuestion}</h2>        
            <fieldset>
                {mixedQuestions}
            </fieldset>                
        </section>
    )
}