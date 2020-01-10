const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const client = require('./utils/oss');

const router = require('./routes');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'./static')));

const MongoStore = connectMongo(session);
app.use(session({
    secret:'keyboard', //加密字符串也可以写数组
    resave:false,     //强制保存session 建议设置成false
    saveUninitialized: true,  //强制保存未初始化的内容
    rolling: true, //动态刷新页面cookie存放时间
    cookie: { maxAge: 7*24*60*60*1000 }, //保存时效
    store: new MongoStore({   //将session存进数据库  用来解决负载均衡的问题
        url:'mongodb://localhost:27017/blog'
    })
}));

router(app);

app.listen(PORT, () => {
    console.log(`服务启动成功，运行在${PORT}端口`);
});

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/blog',  { 
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then((res) => {
        console.log('数据库连接成功'); 
    })
    .catch((err) => {
        console.log('数据库连接失败');
        console.log(err);
    });

// async function put () {
//     try {
//     // object表示上传到OSS的Object名称，localfile表示本地文件或者文件路径
//     let r1 = await client.put('zchang','article'); 
//     console.log('put success: %j', r1);
//     let r2 = await client.get('zchang');
//     console.log('get success: %j', r2);
//     } catch(e) {
//     console.error('error: %j', err);
//     }
// }
// put();

async function put () {
  try {
    let result = await client.put('file.png', './audited.png');
    console.log(result);
   } catch (err) {
     console.log (err);
   }
}

async function get () {
    try {
      let result = await client.get('zchang');
      console.log(result);
    } catch (err) {
      console.log (err);
    }
  }

          
  
// get();

put();
