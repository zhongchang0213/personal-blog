const express = require('express');

const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
    res.send('Hello express!')
});


app.listen(PORT, () => {
    console.log(`服务启动成功，运行在${PORT}端口`);
});
