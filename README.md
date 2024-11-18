## server_monitoring_page

这是一个服务器性能监测站点, 使用 vue.js 搭建, 通过 socket 和服务器建立实时连接, 实时获取服务器性能数据, 并展示在页面上.

这是前端页面, 你可以把它部署在任何地方, 但需要搭配[后端](https://github.com/sooooooooooooooooootheby/server_monitoring)使用.

## 运行

```bash
git clone https://github.com/sooooooooooooooooootheby/server_monitoring_page.git

cd server_monitoring_page

pnpm i

pnpm run dev
```

3. 打开浏览器, 输入 `http://localhost:5173` 即可访问.

![image](./PixPin_2024-11-18_17-12-21.png)

## 修改配置

修改服务器列表请修改 `src/App.vue` 文件中的 serverList 即可, 这是一个数组.
