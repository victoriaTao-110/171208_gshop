const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭语法检查
  lintOnSave:false,
  // 开启代理服务器1，写到端口号就可以   只能配置一个代理，无法控制它是否走代理（它有缓存直接显示缓存）
  // devServer:{
  //   proxy:"http://localhost:5000"
  // }
  // 开启代理服务器2
  devServer:{
    proxy:{
      "/atguigu":{
        target:"http://localhost:5000",
        // 所有以5000开头的数据
        pathRewrite:{"^/atguigu":""},
        ws:true,  // 用于支持websocket
        // 代理服务器会"说谎",它不会如实地告诉服务器它的请求来自哪里（请求中的host值，
            // 为了避免服务器不给响应），它所有的都会回答自己和服务器是同域的
        changeOrigin:true
      },
      "/demo":{
        target:"http://localhost:5001",
        pathRewrite:{"^/demo":""},
        ws:true,  
        changeOrigin:true
      },
      // 简写方式
      // "/foo":{
      //   target:"<other_url>"
      // }
    }
  }
})
