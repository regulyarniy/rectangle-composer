import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from '../src';

export const PresetField = ({ children }) => {
  const wrapperStyles = 'background-color: #C0D6DF; width: 100%; height: 400px;';
  const gridStyles = 'background-color: #B8BBAA;';
  return (
    <Fragment>
      <style>
        {`.wrapperClassName.wrapperClassName {${wrapperStyles}}`}
        {`.wrapperClassName .gridClassName {${gridStyles}}`}
      </style>
      <Field
        wrapperClassName="wrapperClassName"
        gridClassName="gridClassName"
        gridOffset={{ top: 10, left: 10, right: 10, bottom: 10 }}
      >
        {children}
      </Field>
    </Fragment>
  );
};

PresetField.propTypes = {
  children: PropTypes.node,
};

PresetField.defaultProps = {
  children: null,
};
