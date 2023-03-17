const express = require('express');
const cors = require('cors');

const mockData = require('./mockData');

const app = express();
const router = express.Router();


app.use(cors());

router.get('/api/list', (req, res) => {
    res.json({data: mockData})
});

app.use(router);

app.listen(3010, () => {
    console.log(3010 + "已经启动")
})