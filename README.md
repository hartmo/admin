# admin
eggjs后台管理系统,采用的是node服务端渲染的方式渲染前端。使用的技术是node + vue。

  ### 新建migration

  ```npx sequelize migration:generate --name=init-name```
  ### 执行 migrate 进行数据库变更

  ```
    # 升级数据库
    npx sequelize db:migrate
    # 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
    # npx sequelize db:migrate:undo
    # 可以通过 `db:migrate:undo:all` 回退到初始状态
    # npx sequelize db:migrate:undo:all
  ```
  
  #### node技术框架
      -  eggjs + egg-mysql + egg-sequelize
 
  #### 前端技术框架
      - vue + router + axios + elementUI + sass
  #### 初始化
    ``` npm install ```
  #### 运行
    ``` npm run dev ```
  #### 发布
  ```
  
    # 先打包
    npm run build

    # 发布
    npm run start
  ```
