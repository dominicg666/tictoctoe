import React from 'react';
import { number } from 'prop-types';
import Board from './board'
class TicTacToe extends React.Component {

  constructor(props) {
    super(props);
    this.board = new Board(props.width);
    this.state = {player: 1, freezeBoard: false, winner: false};
  }

  nextPlayer() {
    return this.state.player === 1 ? 2 : 1;
  }

  move(x, y, player, callback) {
    this.board.move(x, y, player);
    const winner = this.board.checkWin();

    if (winner) {
      this.setState({winner, freezeBoard: true});
    } else {
      callback();
    }
  }

  // Handle a player's move, and switch to the next player.
  playerMove(event) {
    const [ x, y ] = event.target.dataset.cell.split('_');
    const cellEmpty = this.board.getCell(x, y) === 0;

    if (cellEmpty) {
      this.move(x, y, this.state.player, () => {
        this.setState({player: this.nextPlayer()});
      });
    }
  }


  reset() {
    this.board = new Board(this.props.width);
    this.setState({player: 1, freezeBoard: false, winner: false});
  }

  render() {
    const { board } = this.board;
    let announcement;

    if (this.state.winner) {
      const msg = this.state.winner > 2 ? 'It\'s a tie!' : `Player ${this.state.winner} wins!`;
      announcement = (
        <div className="announcement">
          <p>{ msg }</p>
          <button onClick={ this.reset.bind(this) }>Reset</button>
        </div>
      );
    }

    const grid = board.map((row, rowInd) => {
      const cells = row.map((cell, cellInd) => {
        const classString = cell > 0 ? cell === 1 ? 'cell-p1' : 'cell-p2' : 'cell';
        const coords = `${rowInd}_${cellInd}`;
        let clickHandler;

        if (!this.state.freezeBoard) { clickHandler = this.playerMove.bind(this); }

        return <div className={ classString } key={ cellInd } onClick={ clickHandler } data-cell={ coords }></div>;
      });

      return <div className="row" key={ rowInd }>{ cells }</div>;
    });

    return (
      <div className="grid">
        { grid }
        { announcement }
      </div>
    );
  }
}

TicTacToe.propTypes = { width: number };
TicTacToe.defaultProps = { width: 3 };

export default TicTacToe;