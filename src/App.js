import React, { useEffect, useRef, useState } from 'react'
import * as level from './data'
import './App.css'
import { AiOutlineMenuUnfold } from 'react-icons/ai'

const App = () => {
  const [question, setQuestion] = useState()
  const [numberQuestion, setNumberQuestion] = useState(1)
  const [currentQuestion, setCurrentQuestion] = useState()
  const [checkResult, setCheckResult] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [index, setIndex] = useState()
  const [indexTrue, setIndexTrue] = useState()
  const inputRef = useRef([])
  const [money, setMoney] = useState(level.money)
  const [start, setStart] = useState(true)
  useEffect(() => {
    setQuestion(level[`level${numberQuestion}`]?.questions)
    setCurrentQuestion(level[`level${numberQuestion}`]?.questions[Math.floor(Math.random() * 15)])
  }, [numberQuestion])

  const handleSubmit = (item, index) => {
    setOpenDialog(true)
    console.log(currentQuestion)
    inputRef.current.map(item => item.style.background = 'linear-gradient(to bottom, #132E6A, #08204C)')
    currentQuestion?.options.forEach((el, i) => {
      if (el === currentQuestion?.answer) setIndexTrue(i)
    })
    console.log(indexTrue)
    if (currentQuestion?.answer === item) {
      setIndex(index)
      setCheckResult(true)
      inputRef.current[index].style.background = '#6BA63B'
    }
    else {
      setIndex(index)
      setCheckResult(false)
      inputRef.current[index].style.background = '#6BA63B'
    }
  }

  const countRef = useRef(0)
  const listRef = useRef([])
  const handleCheck = () => {
    setOpenDialog(false)
    inputRef.current[index].style.animation = 'selected 0.8s infinite'
    setTimeout(() => {
      if (checkResult === true) {
        inputRef.current[index].style.animation = 'none'
        inputRef.current[indexTrue].style.background = '#6BA63B'
        setNumberQuestion(pre => pre + 1)
        setCheckGameOver(true)
        let before = countRef.current++
        listRef.current[before].style.border = '1px solid #ccc'
        listRef.current[before].style.borderRadius = '10px'
        listRef.current[before].style.padding = '5px 5px'
        let after = countRef.current - 1
        if(after > 0) {
          listRef.current[after-1].style.border = 'none'
          listRef.current[after-1].style.borderRadius = 'none'
          listRef.current[after-1].style.padding = 'none'
        }

      } else {
        inputRef.current[index].style.animation = 'none'
        inputRef.current[index].style.background = 'red'
        inputRef.current[indexTrue].style.background = '#6BA63B'
        setNumberQuestion(1)
        setStart(true)
        setCheckGameOver(false)
      }
    }, 3000);
  }
  const menuRef = useRef()
  const [menuShow, setMenuShow] = useState(false)
  const openMenu = () => {
    if (menuShow) {
      setMenuShow(false)
      menuRef.current.style.animation = 'openMenu 2s forwards'
    } else {
      menuRef.current.style.animation = 'closeMenu 2s forwards'
      setTimeout(() => {
        setMenuShow(true)
      }, 2000);
    }
  }
  const [checkGameOver, setCheckGameOver] = useState(true)
  return (
    <div className='app'>
      <div className='question__background' />
      <div>
        {
          start ?
            <div >
              {checkGameOver ?
                <div className='question__start' onClick={() => {
                  setStart(false)
                  setMenuShow(false)
                }} >
                  <div>Start game</div>
                </div>
                : <div className='question__start'>
                  <div>Game over</div>
                  <div onClick={() => {
                    setStart(false)
                    setMenuShow(false)
                  }}>Restart</div>
                </div>}
            </div>
            :
            <div>
              <div className='question__title'>Who Wants to Be a Millionaire Wallpapers?</div>
              {menuShow &&
                <div onClick={() => openMenu(true)} className='buttonShowMenu'>
                  <AiOutlineMenuUnfold color='white' />
                </div>
              }
              <div ref={menuRef} className='question__menu'>
                <div className='question__menu-select' onClick={openMenu}>
                  <div>Menu</div>
                  <div>
                    <AiOutlineMenuUnfold />
                  </div>
                </div>
                <ul className='question__list'>
                  {
                    money.money?.map((item, index) => {
                      return <li ref={el => listRef.current[index] = el}>
                        {index + 1} ${item.money}
                      </li>
                    })
                  }
                </ul>
              </div>
              <div className='question__contain'>
                <div className='question'>
                  {currentQuestion?.level}. {currentQuestion?.question}
                </div>
                <div className='question_options'>
                  {currentQuestion?.options.map((item, index) => (
                    <div ref={el => (inputRef.current[index] = el)} onClick={() => handleSubmit(item, index)} key={item} className='question__options-item'>
                      {item}
                    </div>
                  ))}
                </div>
                {
                  openDialog &&
                  <div className='question__dialog'>
                    <div>Are you sure about that?</div>
                    <div className='question__dialog-option'>
                      <span onClick={handleCheck}>Yes</span>
                      <span onClick={() => setOpenDialog(false)}>No</span>
                    </div>
                  </div>
                }
              </div>
            </div>
        }
      </div>
    </div>
  )
}

export default App