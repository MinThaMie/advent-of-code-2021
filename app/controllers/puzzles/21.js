import PuzzlesBaseController from './base';

// BEGIN-SNIPPET day21-classes
class Player {
  constructor(startposition, score, name) {
    this.position = startposition;
    this.score = score;
    this.name = name;
  }

  clone() {
    return new Player(this.position, this.score, this.name);
  }

  move(amount) {
    if ((this.position + amount) % 10 == 0) {
      this.position = 10;
    } else {
      this.position = (this.position + amount) % 10;
    }
    this.score += this.position;
  }

  equals(player) {
    return this.name == player.name;
  }
}

class Die {
  constructor(start, max) {
    this.pointer = start;
    this.max = max;
  }
  role() {
    let first =
      this.pointer > this.max ? this.pointer - this.max : this.pointer;
    let second =
      this.pointer + 1 > this.max
        ? this.pointer + 1 - this.max
        : this.pointer + 1;
    let third =
      this.pointer + 2 > this.max
        ? this.pointer + 2 - this.max
        : this.pointer + 2;
    this.pointer = third + 1;
    return first + second + third;
  }
}
// END-SNIPPET
export default class Puzzles21Controller extends PuzzlesBaseController {
  // BEGIN-SNIPPET day21-solution1
  solve1(input) {
    let [start1, start2] = input;
    let player1 = new Player(start1, 0, 'player1');
    let player2 = new Player(start2, 0, 'player2');
    let turn = player1;
    let die = new Die(1, 100);
    let roleCount = 0;
    let maxScore = 0;
    while (maxScore < 1000) {
      let amount = die.role();
      roleCount += 3;
      turn.move(amount);
      if (turn.score > maxScore) {
        maxScore = turn.score;
      }
      turn = turn == player1 ? player2 : player1;
    }
    return turn.score * roleCount;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day21-solution2
  solve2(input) {
    let [start1, start2] = input;
    return Math.max(...this.turn(0, [start1, start2], [0, 0]));
  }

  move(location) {
    return location % 10 == 0 ? 10 : location % 10;
  }

  dice() {
    let array = [1, 2, 3];
    let results = [];
    array.forEach((a) => {
      array.forEach((b) => {
        array.forEach((c) => {
          results.push(a + b + c);
        });
      });
    });
    return results;
  }

  totalDict = {};
  turn(turn, locations, scores) {
    let key = `${turn},${locations},${scores}`;
    if (this.totalDict[key]) {
      return this.totalDict[key];
    }
    let currentScore = scores[turn];
    let countWinner = [0, 0];
    let dice = this.dice();
    for (let number of dice) {
      let newPosition = this.move(locations[turn] + number);
      if (currentScore + newPosition >= 21) {
        countWinner[turn] += 1;
      } else {
        let newLocations = [...locations];
        newLocations[turn] = newPosition;
        let newScore = [...scores];
        newScore[turn] = currentScore + newPosition;
        let [wins1, wins2] = this.turn(1 - turn, newLocations, newScore);
        countWinner[0] += wins1;
        countWinner[1] += wins2;
      }
    }
    this.totalDict[key] = countWinner;
    return countWinner;
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day21-OO-solution2
  // This code did not work in the end
  turnOO(turn, player1, player2) {
    let key = `${turn.name},${player1.position},${player2.position},${player1.score},${player2.score}`;
    if (this.totalDict[key]) {
      return this.totalDict[key];
    }
    let countWinner = [0, 0];
    let dice = this.dice();
    for (let number of dice) {
      let newTurn = turn.clone();
      newTurn.move(number);

      if (newTurn.score >= 21) {
        countWinner[turn.name] += 1;
      } else {
        if (newTurn.equals(player1)) {
          turn = player2;
          let [wins1, wins2] = this.turnOO(
            turn.clone(),
            newTurn,
            player2.clone()
          );
          countWinner[0] += wins1;
          countWinner[1] += wins2;
        } else {
          turn = player1;
          let [wins1, wins2] = this.turnOO(
            turn.clone(),
            player1.clone(),
            newTurn
          );
          countWinner[0] += wins1;
          countWinner[1] += wins2;
        }
      }
    }
    this.totalDict[key] = countWinner;
    return countWinner;
  }
  //END-SNIPPET
}
