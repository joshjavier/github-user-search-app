import express from 'express'

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index', { title: 'devfinder' })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
