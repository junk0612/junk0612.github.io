import { Client } from 'boardgame.io/react'
import { TicTacToe } from '../../lib/game'
import { TicTacToeBoard } from '../../components/Board'

export default Client({game: TicTacToe, board: TicTacToeBoard})
