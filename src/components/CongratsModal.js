import ReactDOM from 'react-dom';
// import './CongratsModal.css';

const CongratsModal = ({ turns, shuffleCards, show }) => {
  return ReactDOM.createPortal(
    <div className={show ? 'show modal-overlay' : 'modal-overlay'}>
      <div className="modal">
        <h1>Yayy!! All Matched in {turns} Turns.</h1>
        <button onClick={shuffleCards}>New Game</button>
      </div>
    </div>,
    document.body
  );
};

export default CongratsModal;
