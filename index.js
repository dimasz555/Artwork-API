const express = require('express'),
    app = express(),
    PORT = process.env.PORT || 8080,
    cors = require('cors'),
    router = require('./routes/index')

require('dotenv').config()

app.use(express.json({strict: false}))

// const router = require('./routes')

app.use(cors())

app.use('/api/v1', router)


app.get('/', (req, res) => {
    return res.status(200).json({
        message : "hello world"
    })
})

app.get('*', (req, res) => {
    return res.status(404).json({
        error: 'End point is not registered'
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})
