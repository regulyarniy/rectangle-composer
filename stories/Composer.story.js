import React, { useState } from 'react';
import { number, text } from '@storybook/addon-knobs';
import { Composer } from '../src';

export const ComposerStory = () => {
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
        Boxes:
        {initialBlocks.map(JSON.stringify)}
      </div>
      <Composer
        initialRectangles={initialBlocks}
        relativeWidth={number('relativeWidth', 400)}
        relativeHeight={number('relativeHeight', 400)}
        wrapperClassName="composer"
        gridClassName="grid"
        onChange={setInitialBlocks}
        newRectangleProps={{
          width: number('new rectangle width', 50),
          height: number('new rectangle height', 50),
          fill: text('new rectangle fill(hex only)', '#000000'),
        }}
      />
    </div>
  );
};
