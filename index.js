const PORT = 3000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const url = 'https://store.steampowered.com/search/?specials=1'

app.get('/', function (req, res) {
    res.json('This is my webscraper')
})

app.get('/results', (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

            $('.responsive_search_name_combined', html).each(function () { //<-- cannot be a function expression
                const title = $(this).find('.title').text()
                const price = $(this).find('span > strike').text();

                articles.push({
                    title,
                    price,

                })
            })
            res.json(articles)
        }).catch(err => console.log(err))

})


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

