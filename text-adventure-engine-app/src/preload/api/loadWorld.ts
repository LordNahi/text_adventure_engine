import fs from 'fs'

export const loadWorld = () => {
  try {
    const data = fs.readFileSync('../../worlds/intranel.json', 'utf8')

    console.log('data', data)
  } catch (error) {
    console.error(error)
  }
}
