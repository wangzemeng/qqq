[toc]
# smardatenn前端二开流程

## 介绍
smardaten前端二开框架，当前react采用create-react-app修改，vue采用vue-cli修改，webpack使用5.x版本
框架集成了以下的功能：
+ 集成本地开发模式npm run dev，支持可视化预览。
+ 集成在线开发模式，npm run dev:online，支持本地保存，线上直接可看效果，省去了打包上传的时间
+ 集成生产模式打包命令 npm run plugin，一键打包，此打包方式会清除无用的输出语句及debugger语句。
+ 集成开发模式打包命令 npm run plugin:dev,一键打包，此打包方式不会清除语句，且会生成sourcemap文件方便调试
+ 支持css / less 语言，且可扩展使用其他webpack支持的插件。
+ 内置AntD和React，其他涉及性能要求支持多组件复用的场景，也提供了对应的方法

## 前置准备

+ nodejs开发环境
+ npm ，pnpm等前端包管理工具(推荐使用pnpm)
+ 熟练使用vue，react等任一开发框架（smardaten二开不分框架，如有需求vue3，Angular，原生js一样可以用）

## 初始化
控制台运行
```
pnpm/npm/cnpm i sdata-cli -g
```
全局安装完成后，运行
```
scli i 
```
即可选择各对应二开类型
如果提示更新，请务必更新，以确保及时修复已知bug，使用最新特性。

## 文档
scli api （建设中）

## 目录介绍
开发者只需要关注src文件夹和pluginTemp文件夹即可
对于src文件夹 ，通常只需要修改src/components文件夹下的 main（主渲染区域）与 designConfiguration（配置项渲染区域）文件夹即可
+ src/index.js(React)   src/main.js(Vue)
二开入口，及针对开发与生成的相关代码，不需要修改。如果有需要多个二开插件间复用的公共库可以在loadSource方法添加
+ src/App.js    src/App.vue(Vue)
封装type类型选择代码，不需要修改

## 视图渲染
+ src/components/main 
封装了主渲染视图的代码，用户主要修改此处，封装了逻辑控制，通过customConfig与配置项视图进行交互
+ src/components/desiginConfiguration
配置项的渲染区域，通过customConfig与主视图进行交互
+ src/components/development
封装了调试相关的代码，通常不需要修改

## 资源复用
+ src/utils/handlePlatform/loadSource.js
将公共js复制到pluginTemp目录下边的source文件夹，在src/index.js（vue为main.js）的loadScript方法处对应
添加入参即可，如有诉求，可自己改这个js
>默认 vue使用 2.7.14 ,element-ui使用2.15.12，React使用 18.2.0,antd使用4.21.6
```js
/**
 * 复用js的方法
 * @param {string} 复用的js的路径，支持在线地址
 * @param {string} 复用的js的加载promise别名，不与其他名称冲突重复即可
 * @param {string} 复用的js挂载完成后，在window中的命名，此参数需要按实际情况填写
 * @param {string} 回调的最大次数，通常不需要修改
 */
loadScript(path, loadFlag, mountedName, maxIntervalCount = 20)
```

## 接口调用
+ src/api/index.js
目录封装了接口请求的方法及接口定义，通常不需要修改，只在开发新接口时需要用到
+ src/api/request.js
封装了axios，本地调试需要修改cookie的token，如果需要修改接口前缀，可以使用getInstance方法，可以接收一个入参

## 数据获取
+ 接口调用
+ props获取

## 各模块同名API
由于各二开插件为各组单独实现，导致有些API名字不一致，由二开插件adapter.js统一API命名

### customConfig

**`字段描述`**
自定义配置项

**`字段类型`**
`object`
**`字段样例`**

```js
{
  id: "123",
}
```

### changeCustomConfig

**`字段描述`**
修改自定义配置项

**`字段类型`**
function

**`字段样例`**

```js
/**
 * @param {string} 配置项入参
 * @returns {void}
 */
changeCustomConfig('{"id":"123"}');
```

### data

**`字段描述`**
smardaten 传递的视图数据

**`字段类型`**
`any`

### componentId

**`字段描述`**
smardaten 分配的二开插件 id，配合逻辑控制使用，通常用不到

**`字段类型`**
`string`

## 逻辑控制
### 功能说明
逻辑控制指的将组件事件与动作开放，通过配置事件触发驱动动作的执行，将配置信息集中存储到事件中心，组件事件触发通知事件中心，事件中心按照配置分发执行组件动作，最终实现完全独立的组件之间建立逻辑通信。例如：下拉框组件的内容改变事件关联Input组件动作的显示隐藏，当下拉框内容改变的时候，通过事件中心，触发Input组件显示隐藏动作。
说白了就是暴露组件内部方法给其他组件使用

### 事件定义
eventeActionDefinitions.js

```js
const events = [
  {
    key: "searchValueChange", 
    name: "搜索条件变化", 
    payload: [
      {
        key: "searchValue", 
        name: "搜索条件", 
        dataType: "string"
      }
    ],
  }，
  {
    key: "mounted", name: "组件挂载完成", payload: []
  }
];
const actions = [
  {
    key: "setValue",
    name: "设值",
    isSupportChild: true, // 是否支持子表(填报组件)
    params: [
      {
        key: "value",
        name: "值",
        dataType: "string"
      },
    ],
  }
]
```
### 触发事件

```js
triggerEvent(eventName,{})
```

### 动作声明
```js
/**
 * @example
 */
do_EventCenter_alert({ value }) {
  alert(value);
},
```
### smardaten逻辑控制的使用
* 点击组件，交互，在逻辑控制处选择
![](https://gitee.com/njsmartdata/sdata-plugins/raw/master/images/process2.png)
* 点击顶栏，逻辑控制
![](https://gitee.com/njsmartdata/sdata-plugins/raw/master/images/process1.png)

## 调试
### 本地调试
+ react
  1. 修改proxy.js的target字段为代理地址
  2. 修改src/api/request.js中document.cookie的token和refreshToken字段为代理地址请求头的相应字段
  3. npm run dev
+ vue
  1. 修改vue.config.js的target字段为代理地址，
  2. 修改src/api/request.js中document.cookie的token和refreshToken字段为代理地址请求头的相应字段
  3. npm run dev
### 在线开发模式
大部分的场景都可以通过本地调试，即 npm run dev 命令执行，但是有一些平台独有的方法或者数据（比如页签二开的关闭方法，列表自定义按钮响应方式的列表刷新方法），本地 mock 不了，这种时候就需要通过开启在线开发模式进行，在线开发模式仅适用于$\color{red}{v8r4c120\_0605之后的版本}$ ，在此之前只能用本地调试
1. 将 config.json 中的 online-development-mode 字段，open 置为 true,修改对应的host，port字段（百分之九十场景默认即可，不需修改,port需要与本地启动的端口号保持同步）
如果报错http://localhost:3000/js/app.js找不到，多半就是你的port字段不对，如果本地端口已经被占用，请顺序+1
1. 执行 npm run plugin 命令
2. 一意孤行
3. 线上传入对应二开包，并在你想要生效的地方将对应二开拖拽到对应视图上，保存
4. 本地执行 npm run dev:online 命令
5. 观察到弹出页面出现 功能正常，请打开线上地址调试即代表开启成功，刷新线上对应页面即可
6. 开发完成后，执行 npm run plugin 命令打生产包，记得从善如流关闭线上开发模式，否则生产会炸。
## 插件包的使用
1. 左侧选择开放平台，形式开放（或者直接输入地址/developer）
![](https://gitee.com/njsmartdata/sdata-plugins/raw/master/images/developer.png)
1. 选择对应的插件类型，上传，记得将插件开启
2. 到对应的插件类型处，选择，修改配置项，保存
3. 预览效果

## 问题定位
1. 运行npm run plugin:dev打线上调试包
2. 查看二开入口是否进入
3. 打印入口props
4. 走正常调试debugger流程

## 其他注意事项（开发过程中务必关注）
+ 在组件的模板中，预置了一些事件动作相关的函数及定义，请在正式开发中将$\color{red}{用不到的事件与动作清除掉}$，并正确书写`Event_Center_getName`函数的返回值，以防止对配置人员造成困扰。
+ 二开组件代码中，如果需要获取dom元素并进行操作，React或Vue都应通过ref去获取dom元素而非通过选择器，以防止组件复用时造成冲突
+ 分析仪,大屏二开通常对图表类进行二次开发，所以应加上监听尺寸的变化，并在其中写入图表重绘方法
  ```js
  /**
   * @example
   */
  let chart= echarts.init(this.refs.chart)
  let resizeObserver = new ResizeObserver(() => {
  // 宽高等变化后需要执行的逻辑

  });
  resizeObserver.observe(chart);
  ```
+ 为了性能方面的考虑，当前react，reactdom，antd用的是平台window里挂载的实例。
  其中react和reactdom版本为18.2.0，antd版本为4.21.6（此处需注意，antd不同版本，写法略有差异）
  如果某一插件需要使用某一版本，请用import方式导入，而不是使用window中的实例
+ 为了性能方面的考虑，vue，elementui也使用的是同一个实例，限定版本为vue2的最高版本，如果特殊需要，请修改对应代码(loadSource)。

