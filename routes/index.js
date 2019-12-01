let user = require('./user');

module.exports = app => {
    /*
        配置一级路由
        /blog为此项目跟路由接口
    */ 

    app.use('/blog/user', user);
};
