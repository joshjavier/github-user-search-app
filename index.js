import express from 'express'
import GitHubUser from './GitHubUser.js'

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', async (req, res) => {
  const { username } = req.query

  try {
    const user = await GitHubUser.fetch(username || 'octocat')

    if (user) {
      res.render('index', {
        user: user.info,
        query: { username: username?.toString() }
      })
    } else {
      res.render('index', {
        error: 'No matching users.',
        query: { username: username?.toString() }
      })
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
