const express = require('express');
const bodyParser = require('body-parser');
const wol = require('wol');

const app = express();
const port = 3000; // 选择你喜欢的端口

// 解析请求体中的 JSON 数据
app.use(bodyParser.json());

// 设置静态文件目录，例如用于存放 HTML、CSS 和 JS 文件
app.use(express.static('public'));

// 验证密钥并发送 WoL 唤醒数据包
app.post('/wakeup', (req, res) => {
    const { key } = req.body;
    const validKey = 'wacom'; // 这里替换为你的密钥

    if (key === validKey) {
        const macAddress = 'B4:2E:99:C2:17:A3'; // 替换为你要唤醒的设备的 MAC 地址
        wol.wake(macAddress, (err) => {
            if (err) {
                console.error('Wake-on-LAN error:', err);
                res.status(500).send({ message: 'Failed to send the wake-up packet.' });
            } else {
                res.send({ message: 'The wake-up packet has been sent successfully.' });
            }
        });
    } else {
        res.status(401).send({ message: 'Unauthorized access. Incorrect key.' });
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});