##如何跑起来

> npm install

> npm install -g gulp

> gulp down

需要经常更新 > npm install pixi-lib

###Update resource Dirctory

- Change resource in loader with value of NODE_ENV 

- To upload images use command `gulp qiniu` and change `window.NODE_ENV` to 'production' in 'src/index.js' 

The changed direction:
```bash
── resource
│   ├── boat2
│   │   └── boat2.png
    │ .......
├── scenes
│   ├── scene0
│   │   ├── addResource.js
│   │   └── index.js
│   ├── scene1
│   │   └── index.js
│   └── scene2
│       └── index.js
└── sprites
    ├── blockContainer
    │   └── index.js
    ├── boat
    │ ......
```
