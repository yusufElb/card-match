import { useState, useEffect } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { src: './build/img/king-1.png', matched: false },
  { src: './build/img/queen-1.png', matched: false },
  { src: './build/img/rook-1.png', matched: false },
  { src: './build/img/bishop-1.png', matched: false },
  { src: './build/img/knight-1.png', matched: false },
  { src: './build/img/pawn-1.png', matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setdisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    console.log(choiceOne, choiceTwo);
  };

  //compare card choices
  useEffect(() => {
    if (turns === 0) {
    }
    if (choiceOne && choiceTwo) {
      setdisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 750);
      }
    }
  }, [choiceOne, choiceTwo, turns]);

  console.log(cards);

  //reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setdisabled(false);
  };

  //instant start a game
  useEffect(() => {
    shuffleCards();
  }, []);

  //check if no cards with matched
  // useEffect(() => {
  //   if (
  //     currentCards.length !== 0 &&
  //     currentCards.filter((currentCard) => !currentCard.matched).length === 0
  //   ) {
  //     setAllMatched(true);
  //   }
  // }, [currentCards]);

  return (
    <div className="App">
      {cards.every((card) => card.matched === true) && (
        <div className="win">Well done!</div>
      )}
      <h1>Match The Chess Pieces</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>

      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
