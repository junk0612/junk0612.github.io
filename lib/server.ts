import type { Game } from 'boardgame.io'
import { Server, Origins } from 'boardgame.io/server'
import { TicTacToe } from './game'

const server = Server({
  games: [TicTacToe as Game],
  origins: [Origins.LOCALHOST],
})

server.run(8000)
