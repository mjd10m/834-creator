const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3001

const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require('./routes'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

app.use(express.static(path.join(__dirname, '../client/build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});




app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})