import express from 'express'
import GitHubUser from './GitHubUser.js'

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', async (req, res) => {
  try {
    const user = await GitHubUser.fetch('octocat')
    res.render('index', { user: JSON.stringify(user.info) })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

app.get('/:username', async (req, res) => {
  try {
    const user = await GitHubUser.fetch(req.params.username)
    if (user.exists) {
      res.render('index', { user: JSON.stringify(user.info) })
    } else {
      res.render('index', { error: 'No matching users.' })
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
