import React from 'react';
import Question from './question';
import {nanoid} from "nanoid"

export default function App() {

  const [trivia, setTrivia] = React.useState([])
  const [startPage, setStartPage] = React.useState(false)
  const [score, setScore] = React.useState({val: 0, press: false})
  const [backToStart, setBackToStart] = React.useState(false)
  const [categories, setCategories] = React.useState({nrQuestions: "10", category: "", difficulty: "", type: ""})

  const game = trivia.map(element => <Question key={element.id} element={element} trivia={trivia} score={score}/>)

  React.useEffect(() => {
      GenerateQuestions()
  }, [categories])

  function GenerateQuestions() {
    getData().then(data => {
      setTrivia(setNewData(data))
    })
  }

  async function getData(){
    const res = await fetch(`https://opentdb.com/api.php?amount=${categories.nrQuestions}&category=${categories.category}&difficulty=${categories.difficulty}&type=${categories.type}`)
    const data = await res.json()
    console.log(data)
    return data.results
  }

  function setNewData(data){
    const game = data.map(element => {

      let poz = -1
      let all = element.incorrect_answers.concat(element.correct_answer).sort()
      all = all.map(el => {
        poz += 1
        return {val: DecodeEl(el), index: poz}
      })

      let press = all.map(el => false)
      const quest = DecodeEl(element.question)
      const correctAns = DecodeEl(element.correct_answer)

      return {
        id: nanoid(),
        correctAnswer: correctAns,
        allAnswers: all,
        question: quest,
        isHeld: press,
        checked: false
      }
    })
    return game
  }

  function DecodeEl(val) {
    let textarea = document.createElement("textarea");
    textarea.innerHTML = val;
    return textarea.value;
  }

  function StartTrivia(){
    setStartPage(true)
  }

  function ChangeAll(){
    let sum = 0
    for(let i=0; i<trivia.length;i++)
      {
        const element = trivia[i]
        element.checked = false
        setBackToStart(false)
        for(let j=0; j<element.isHeld.length;j++)
          {
            if(element.isHeld[j])
              element.checked = true
            if(element.isHeld[j] && element.allAnswers[j].val == element.correctAnswer)
            {
              sum += 1
            }
          }
      }
      console.log(sum)
      if(AllChecked())
        {
          setScore({val: sum, press: true})
          setBackToStart(true)
        }
      else
        setScore({...score, press: false})
    
  }

  function AllChecked(){
    for(let i=0;i<trivia.length;i++)
      if(!trivia[i].checked)
        return false
    return true
  }

  function StartAgain(){
    setTrivia([])
    setScore({val: 0, press: false})
    setStartPage(false)
    setBackToStart(false)
    GenerateQuestions()
  }

  function TriviaValues(event){
    const name =  event.currentTarget.name
    setCategories(val => {
      return {...val, [name]: event.target.value}
    })
  }

  console.log(categories)

  return !startPage ? 
  (
    <div className='start-page'>
      <h1>Quizzical</h1>
      <h3>Play now!</h3>
      <div className='select'>
        <label htmlFor="nrQuestions">Number of questions</label>
        <input type="number" name='nrQuestions' defaultValue="10" onChange={TriviaValues}/>
        <label htmlFor="category">Select Category</label>
        <select name="category" id="category" onChange={TriviaValues}>
          <option value="">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment Books</option>
          <option value="11">Entertainment Film</option>
          <option value="12">Entertainment Music</option>
          <option value="13">Entertainment Musicals and Theatres</option>
          <option value="14">Entertainment Television</option>
          <option value="15">Entertainment Video Games</option>
          <option value="16">Entertainment Board Games</option>
          <option value="29">Entertainment Comics</option>
          <option value="31">Entertainment Japanese Anime and Manga</option>
          <option value="32">Entertainment Cartoon and Animations</option>
          <option value="17">Science and Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="30">Science:Gadgets</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
        </select>
        <label htmlFor="difficulty">Select Difficulty</label>
        <select name="difficulty" id="difficulty" onChange={TriviaValues}>
        <option value="">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <label htmlFor="type">Select Type</label>
        <select name="type" id="type" onChange={TriviaValues}>
          <option value="">Any Type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True/False</option>
        </select>
      </div>
      <button className='check-answers' onClick={StartTrivia}>Start quiz</button>
    </div>
  ) :

  (
    <div className='container'>
      {game}
      {AllChecked() ? (score.press ? <h3 className='result'>Your score is {score.val}/{parseInt(categories.nrQuestions)} </h3> : <></>) : <h3 className='result' style={{color: "red"}}>Answer all the question first!</h3>}
      {(AllChecked() && backToStart) ? <button className='check-answers' onClick={StartAgain}>Start Again</button> : <button className='check-answers' onClick={ChangeAll}>Check Answers</button>}
    </div>
  )
}