# Rectangle composer

[![Dependencies Status](https://david-dm.org/regulyarniy/rectangle-composer.svg)](https://david-dm.org/psychobolt/react-rollup-boilerplate)
[![Dev Dependencies Status](https://david-dm.org/regulyarniy/rectangle-composer/dev-status.svg)](https://david-dm.org/psychobolt/react-rollup-boilerplate?type=dev)
[![Peer Dependencies Status](https://david-dm.org/regulyarniy/rectangle-composer/peer-status.svg)](https://david-dm.org/psychobolt/react-rollup-boilerplate?type=peer)

[![Build Status](https://travis-ci.org/regulyarniy/rectangle-composer.svg?branch=master)](https://travis-ci.org/psychobolt/react-rollup-boilerplate)
[![codecov](https://codecov.io/gh/regulyarniy/rectangle-composer/branch/master/graph/badge.svg)](https://codecov.io/gh/psychobolt/react-rollup-boilerplate)

A React component for visual editing rectangles in 2D plane

## Installation

YARN:

`yarn add rectangle-composer konva react-konva styled-components`

NPM: 

`npm install rectangle-composer konva react-konva styled-components`


konva, react-konva and styled-components are peer dependencies

## Usage

### Basic:

Import `Composer` component from `rectangle-composer` for basic usage

Pass initial array of rects and some styling:

```
import React from 'react';
import Composer from rectangle-composer;

export const MyComponent = () => {
  const containerStyles = 'display: flex;';
  const panelStyles = 'width: 30%; overflow: auto;';
  const wrapperStyles = 'background-color: #C0D6DF; width: 70%; height: 400px;';
  const gridStyles = 'background-color: #B8BBAA;';
  const [initialBlocks, setInitialBlocks] = useState([
    { top: 10, bottom: 50, left: 100, right: 200, fill: 'blue' },
    { top: 60, bottom: 120, left: 0, right: 390, fill: 'red' },
    { top: 150, bottom: 200, left: 100, right: 200, fill: 'green' },
  ]);

  return (
    <div className="container">
      <style>
        {`.container {${containerStyles}}`}
        {`.panel {${panelStyles}}`}
        {`.composer.composer {${wrapperStyles}}`}
        {`.composer .grid {${gridStyles}}`}
      </style>
      <div className="panel">
        * Click on empty space to create rectangle.
        <br />
        * Click on existing rectangle to edit.
        <br />
        * All relative units passed to Composer is recalculated responsively to grid size.
        <br />
        Boxes:
        <br />
        {initialBlocks.map(JSON.stringify)}
      </div>
      <Composer
        initialRectangles={initialBlocks}
        relativeWidth={400}
        relativeHeight={400}
        wrapperClassName="composer"
        gridClassName="grid"
        onChange={setInitialBlocks}
        newRectangleProps={{
          width:  50,
          height: 50,
          fill: '#000000',
        }}
      />
    </div>
  );
};
```

### Advanced:

`Composer` component is basically wrapping some `Field`, `Rectangle` and `EditedRectangle` into single stateful component.

You can use any `react-konva` components in combination with `Field`, `Rectangle`, `EditedRectangle` to customize expected behavior or styles.

For intersection check you can import `getBoundBoxFunc` and `getDragBoundFunc` into your app.

See [Storybook](https://regulyarniy.github.io/rectangle-composer/) and source code for more info.

Issues, PR and discussions are welcome!

## Demo & docs

[Storybook with use cases and prop descriptions](https://regulyarniy.github.io/rectangle-composer/)

[Codesandbox with basic usage](https://codesandbox.io/s/rectangle-composer-7lfi4)

## Boilerplate used

[React Rollup Boilerplate](https://github.com/psychobolt/react-rollup-boilerplate)
