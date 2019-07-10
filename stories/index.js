import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';
import { text, object } from '@storybook/addon-knobs';

import { Field } from 'src';
import Readme from '../README.md';


storiesOf('Documentation', module)
  .add('Readme', doc(Readme));

storiesOf('Components', module)
  .addParameters({
    props: {
      propTables: [Field],
      propTablesExclude: [Fragment, 'Child', 'style'],
    },
  })
  .add('Field', () => {
    const wrapperStyles = text('wrapper styles', 'background-color: #C0D6DF; width: 100%; height: 500px;');
    const gridStyles = text('grid styles', 'background-color: #DD6E42;');
    const Child = () => <div className="axis" />;
    return (
      <Fragment>
        <style>
          {`.wrapperClassName.wrapperClassName {${wrapperStyles}}`}
          {`.wrapperClassName .gridClassName {${gridStyles}}`}
          {'.axis {position: absolute; left: 10px; width: 10px; height: 90%; border: 1px dashed black;}'}
        </style>
        <Field
          wrapperClassName={text('Prop: wrapperClassName', 'wrapperClassName')}
          gridClassName={text('Prop: gridClassName', 'gridClassName')}
          gridOffset={object('Prop: gridOffset', { top: 100, left: 120, right: 20, bottom: 15 })}
        >
          <Child />
        </Field>
      </Fragment>
    );
  });
