// import he from "he";

export function Question({ question }) {

    console.log(question.question)
    const decodedQuestion = new DOMParser().parseFromString(text, "text/html")

    return (
        <section className="question-section">
            <h2 className="question">{question.question}</h2>
            <form action="">
                <fieldset>
                    <label>Adiós
                        <input type="radio" name="question1" id="question1" value="Adiós"/>
                    </label>
                    <label>Hola
                        <input type="radio" name="question1" id="question1" value="Hola"/>
                    </label>
                    <label>Au Revoir
                        <input type="radio" name="question1" id="question1" value="Au Revoir"/>
                    </label>
                    <label>Salir
                        <input type="radio" name="question1" id="question1" value="Salir"/>
                    </label>
                </fieldset>                
            </form>
        </section>
    )
}