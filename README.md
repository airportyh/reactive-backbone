reactive-backbone
=================

A reactive model adapter for Backbone models.

## Install

npm: `npm install reactive-backbone`
component: `component install airportyh/reactive-backbone`

## Usage

```js
var ReactiveBackbone = require('reactive-backbone');
var reactive = require('reactive');

reactive(template, model, {
  adapter: ReactiveBackbone
});
```