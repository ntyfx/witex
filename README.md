# WiTex

## 使用

```
npm install witex
```



## API

1. 给定一个dom节点的ID，render结果将直接覆盖原dom内容

```
WiTex.render(id);
```

2. 给定一段文本，在callback中获取render之后的html片段

```
WiTex.render(text, callback);
```

## Run Simple Example

1. 开启本地服务

```
php -S 0.0.0.0:8000
```

2. 访问 [http://127.0.0.1:8000/example/simple/index.html](http://127.0.0.1:8000/example/simple/index.html)

## [TODO]Run Webpack Example

1. 安装依赖

```
npm install
```

2. 开启服务

```
npm start
```