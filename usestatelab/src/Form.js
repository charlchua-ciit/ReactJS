import { useState } from "react";

function Form(){
    const [grades, setGrades] = useState({
        overGrade: 0,
        finalGrade: 0
      })
    
      const updateOverall = (x) => {
        setGrades(previousState => {
        return { ...previousState, overGrade: x }
        })
    }

    const updateFinal = (x) => {
        setGrades(previousState => {
        return { ...previousState, finalGrade: x }
        })
    }

    const calcGrades = () =>{
        let quiz = document.getElementById("quiz").value
        let lab = document.getElementById("lab").value
        let finals = document.getElementById("finals").value

        let overGrade = ((quiz*0.3)+(lab*0.3)+(finals*0.4))
        let finalGrade = gradeConverter(overGrade)

        updateOverall(overGrade)
        updateFinal(finalGrade)

        console.log(quiz,lab,finals,overGrade,finalGrade)

    }

    const gradeConverter = (x) =>{
        if (x<=74.5){
            return 0
        }
        if (x<=76.5){
            return 1.00
        }
        if (x<=78.5){
            return 1.25
        }
        if (x<=80.5){
            return 1.50
        }
        if (x<=82.5){
            return 1.75
        }
        if (x<=84.5){
            return 2.00
        }
        if (x<=86.5){
            return 2.25
        }
        if (x<=88.5){
            return 2.50
        }
        if (x<=90.5){
            return 2.75
        }
        if (x<=92.5){
            return 3.00
        }
        if (x<=94.5){
            return 3.25
        }
        if (x<=96.5){
            return 3.50
        }
        if (x<=98.5){
            return 3.75
        }
        if (x<=100){
            return 4
        }     
    }

    return (
        <div class="formDiv">
            <form>
                <label for="quiz">Quizzes</label><br />
                <input type="text" name="quiz" id="quiz" /><br />
                <label for="lab">Lab Activities</label><br />
                <input type="text" name="lab" id="lab" /><br />
                <label for="finals">Final Exam</label><br />
                <input type="text" name="finals" id="finals" /><br />
                <button type="button" onClick={calcGrades}>Submit</button><br />
            </form>
            <p>Grade: {grades.overGrade}</p>
            <p>Final Grade: {grades.finalGrade}</p>
        </div>
        
    )
}

export default Form;