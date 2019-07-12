import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';
import { text, number, color, object } from '@storybook/addon-knobs';
import { Rect, Text } from 'react-konva';
import { action } from '@storybook/addon-actions';

import { Field, Rectangle, EditableRectangle, Composer } from '../src';
import Readme from '../README.md';
import { PresetField } from './PresetField';
import { EditableRectangleStory } from './EditableRectangle.story';
import { ComposerStory } from './Composer.story';

storiesOf('Documentation', module)
  .add('Readme', doc(Readme));

storiesOf('Components', module)
  .addParameters({
    props: {
      propTables: [Field],
      propTablesExclude: [Fragment],
    },
  })
  .add('Field', () => {
    const wrapperStyles = text('wrapper styles', 'background-color: #C0D6DF; width: 100%; height: 400px;');
    const gridStyles = text('grid styles', 'background-color: #DD6E42;');
    const Child = () => <div className="axis" />;
    return (
      <Fragment>
        <style>
          {`.wrapperClassName.wrapperClassName {${wrapperStyles}}`}
          {`.wrapperClassName .gridClassName {${gridStyles}}`}
          {'.axis {position: absolute; left: 10px; top: 5%; width: 10px; height: 90%; border: 1px dashed black;}'}
        </style>
        <Field
          wrapperClassName={text('Prop: wrapperClassName', 'wrapperClassName')}
          gridClassName={text('Prop: gridClassName', 'gridClassName')}
          gridOffset={object('Prop: gridOffset', { top: 100, left: 120, right: 200, bottom: 150 })}
          preContent={<Child />}
          stageProps={{ onClick: action('stage-click') }}
        >
          <Rect
            x={100}
            y={50}
            width={50}
            height={50}
            fill="blue"
          />
          <Text text="Click on stage" y={100} x={200} />
        </Field>
      </Fragment>
    );
  })
  .addParameters({
    props: {
      propTables: [Rectangle],
      propTablesExclude: [PresetField],
    },
  })
  .add('Rectangle', () => {
    const x = number('x', 50);
    const y = number('y', 50);
    const width = number('width', 50);
    const height = number('height', 50);
    const fill = color('custom fill', '#98E3C2');
    return (
      <PresetField>
        <Rectangle x={x} y={y} width={width} height={height} fill={fill} />
      </PresetField>
    );
  })
  .add('Rectangle with children', () => {
    const x = number('x', 50);
    const y = number('y', 50);
    const width = number('width', 50);
    const height = number('height', 50);
    const fill = color('custom fill', '#98E3C2');
    return (
      <PresetField>
        <Rectangle x={x} y={y} width={width} height={height} fill={fill}>
          <Text text="child node" y={25} x={0} />
        </Rectangle>
      </PresetField>
    );
  })
  .addParameters({
    props: {
      propTables: [EditableRectangle],
      propTablesExclude: [EditableRectangleStory],
    },
  })
  .add('EditableRectangle', () => <EditableRectangleStory />)
  .addParameters({
    props: {
      propTables: [Composer],
      propTablesExclude: [ComposerStory],
    },
  })
  .add('Composer', () => <ComposerStory />);
