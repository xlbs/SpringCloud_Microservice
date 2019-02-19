var webpack = require('webpack');
var express = require('express');
var webpackDevMiddleware = require('webpack-dev-middleware');//webpack服务器
var webpackHotMiddleware = require('webpack-hot-middleware');//热更新
var webpackConfig = require('./webpack.config');
var proxyMiddleWare = require("http-proxy-middleware");
var ip = require('ip');

const app = express();
const port = 3000;
const compiler =  webpack(webpackConfig);

//使用 webpack-dev-middleware
app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet     : false,
    noInfo    : false,
    lazy      : false,
    stats     : {
                   colors: true,
                   timings: true
    }
}));

//使用 webpack-hot-middleware
app.use(webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr'
}));

app.use("/api/*", proxyMiddleWare({
   target: 'http://'+ ip.address()+ ':8080',
   changeOrigin: true,
   ws: true,
   pathRewrite: {
       '/api/':'/'
   }
}))

// var ejs = require('ejs');
// app.engine('html', ejs.renderFile);
// app.set('views', path.join(__dirname));
// app.set("view engine", "html");
// app.get("/", function(req, res) {
//     res.render("index");
// });

var path = require('path');//设置路径
const DIST_DIR = path.join(__dirname, "dist");
app.use("*", (req, res, next) =>{
    const filename = path.join(DIST_DIR, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) =>{
        if(err){
            return(next(err))
        }
        res.set('content-type', 'text/html')
        res.send(result)
        res.end()
    })
})

app.listen(port, function (error) {
    if(error){
        console.error(error);
    }else{
        console.info("===>>> Listening on port "+port+", Open up http://"+ ip.address()+ ":"+port+" in your browser.");
    }
})
