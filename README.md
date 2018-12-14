# pharbers-emberbasis-library

本项目是Ember Addon基于Ember 2.18.2，中间复写了很多Ember的Function，主要是在Ember这个前端框架上为Pharbers封装一层符合公司的中间件，目前还在开发中，文档会持续更新。
目前项目集成
1. 对store进行封装，提供符合Pharbers的设计与Function
2. 函数注册，统一管理调用
3. Model => LocalStorage存储(JSONAPI形式)
4. blueprint提供

## Installation

* `git clone <repository-url>` this repository
* `cd pharbers-emberbasis-library`
* `npm install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
