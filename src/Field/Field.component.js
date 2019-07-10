import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as styles from './Field.style';

const Wrapper = styled.div`
  ${styles.wrapper}
`;

const FieldComponent = props => (
  <Wrapper />
);

FieldComponent.propTypes = {

};

export default FieldComponent;
