import React from 'react';
import './index.css'
let boxs = []
for(let i = 0; i < 9; i++) boxs.push(i)
// 方块
function Square (props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}
// 判断胜负
function calculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if ( 
      squares[a] && 
      squares[a] === squares[b] &&
      squares[b] === squares[c]
    ) {
      return squares[a]
    }
  }
  return null
}
// 棋盘
class Board extends React.Component{
  renderSquare(i){
    return <Square 
      key={i}
      onClick={ () => this.props.onClick(i) }
      value={ this.props.squares[i] }>
    </Square>
  }
  
  render () {
    return (
      <div className="board-box">
        {
          boxs.map(item => {
            return (
              this.renderSquare(item)
            )
          })
        }
      </div>
    )
  }
}
class Game extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      history:[
        {
          squares: Array(9).fill(null)
        }
      ],
      xIsNext: true,
      stepNumber: 0
    }
  }
  clickHandler = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (squares[i] || calculateWinner(squares)) return
    squares[i] = this.moveLater()
    this.setState({
      history: [...history, { squares }],
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    })
  }
  moveLater = () => {
    return this.state.xIsNext ? 'X' : 'O'
  }
  jumpTo = (i) => {
    this.setState({
      stepNumber: i,
      xIsNext: i % 2 === 0
    })
  }
  render () {
    const history = this.state.history
    console.log(history)
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)
    let status = winner ? 'Winner: ' + winner :'Next player: ' + this.moveLater()
    const moves = history.map((step, i) => {
      const desc = i ? `Go to move #${i}` : 'Go to game start'
      return (
        <li key={i}>
          <button onClick={() => this.jumpTo(i)}>{desc}</button>
        </li>
      )
    })
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.clickHandler(i) }
          ></Board>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>
            {moves}
          </ol>
        </div>
      </div>
    )
  }
}


export default Game