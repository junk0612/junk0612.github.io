import fs from 'fs'
import { join } from 'path'
import { Entry } from '../entry'
import { games, GameWithContent } from '../game'

const list = async (): Promise<Entry[]> => {
  const entries = games.map((game) => ({
    ...game,
    path: `/games/${game.slug}`,
  }))

  return new Promise((resolve) => resolve(entries))
}

const gameDir = join(process.cwd(), 'contents', 'games')

const findBySlug = async (slug: string): Promise<GameWithContent> => {
  const game = games.find((game) => game.slug === slug)!
  const path = join(gameDir, `${slug}.md`)
  const content = fs.readFileSync(path, 'utf-8')
  return new Promise((resolve) => resolve({ ...game, content }))
}

const GameRepository = { list, findBySlug }

export default GameRepository
