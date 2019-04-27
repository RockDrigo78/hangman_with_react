import React, { Component } from "react";
import "./Hangman.css";
import { randomWord } from './words';
import img0 from "./images/0.jpg";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";
import img6 from "./images/6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
    static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };
    
  constructor(props) {
    super(props);    
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset(){
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    });
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        value={ltr}
        key={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
  
    const isWinner = this.guessedWord().join("") === this.state.answer;
    const triesLeft = this.props.maxWrong-this.state.nWrong;
    let gameState = this.generateButtons();
    if(isWinner) gameState = <h2>"You Win!!!"</h2>;
    if(!triesLeft) gameState = <h2>You Lost! The answer is: {this.state.answer}</h2>;

    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={this.state.nWrong} />
        <p>Number of tries left: {triesLeft}</p>
        <p className='Hangman-word'>{this.guessedWord()}</p>
        {gameState}
        <br/><button id="reset" onClick={this.reset}>Reset</button>
      </div>
    );
  }
}

export default Hangman;
