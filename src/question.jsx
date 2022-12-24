import React from 'react'
import {nanoid} from "nanoid"

export default function Question(props){

    const [aux, setAux] = React.useState(0)

    function Change(index){
        props.element.isHeld[index] = !props.element.isHeld[index]
        for(let i=0;i<props.element.isHeld.length;i++)
            if(i!=index)
            props.element.isHeld[i] = false
        setAux(aux+1)
    }

    function AllChecked(){
        for(let i=0;i<props.trivia.length;i++)
          if(!props.trivia[i].checked)
            return false
        return true
      }
    
    const buttons = props.element.allAnswers.map(val => {
        const poz = props.element.isHeld[val.index]
        const style = {
                backgroundColor: !props.score.press ? (poz ? "#D6DBF5" : "white") : ((val.val == props.element.correctAnswer && AllChecked()) ? "#94D7A2" : (poz && AllChecked()) ? "#F8BCBC" : "white")
        }

        return <button disabled={props.score.press} key={nanoid()} style={style} onClick={() => Change(val.index)}>{val.val}</button>
})

    return (
        <div className='question'>
            <h1>{props.element.question}</h1>
            <div className='answers'>
                {buttons}
            </div>
        </div>
    )
}