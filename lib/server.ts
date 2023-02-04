import type { Game } from 'boardgame.io'
import { Server, Origins } from 'boardgame.io/server'
import { TicTacToe } from './game'

const server = Server({
  games: [TicTacToe as Game],
  origins: ['*'],
})

server.run(Number(process.env['PORT']))
