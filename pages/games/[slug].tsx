import { Client } from 'boardgame.io/react'
import { TicTacToe } from '../../lib/game'
import { TicTacToeBoard } from '../../components/Board'
import { SocketIO } from 'boardgame.io/multiplayer'

export default Client({game: TicTacToe, board: TicTacToeBoard, multiplayer: SocketIO({ server: 'junk0612-github-io.vercel.app' })})
