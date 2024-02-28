const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3001
const cors = require('cors')

const app = express()

const allowedOrigins = [
    'http://localhost:3000',
    'https://eight34-creator.onrender.com'
];

const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
};

app.use(cors(corsOptions));
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