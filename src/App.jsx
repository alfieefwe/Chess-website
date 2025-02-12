import ChessBoard from "./ChessBoard";

function App() {
  return (
    <div>
      <h1>Welcome to Chess App</h1>
      <div id="chess-board">
        <ChessBoard />
      </div>
      <div id="controls">
        <button>Start Game</button>
        <button>Reset Game</button>
      </div>
    </div>
  );
}

export default App;
