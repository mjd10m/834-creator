const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3001

const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }
  
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


app.get('/api', (req, res)=> {
    console.log(req)
    const text =  Date.now()
    res.send(json(text))
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})