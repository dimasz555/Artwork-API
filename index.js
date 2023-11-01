const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    cors = require('cors'),
    router = require('./routes/index')

require('dotenv').config()

app.use(express.json({strict: false}))

// const router = require('./routes')

app.use(cors())

app.use('/api/v1', router)


app.get('*', (req, res) => {
    return res.status(404).json({
        error: 'End point is not registered'
    })
})

app.listen(port, () => {
    console.log(`Server is running at PORT ${port}`)
})
