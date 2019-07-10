import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Measure from 'react-measure';
import { Stage, Layer, Group, Image, Text } from 'react-konva';
import * as styles from './Field.style';

const MainWrapper = styled.div`
  ${styles.mainWrapper}
`;

const GridWrapper = styled.div`
  ${styles.gridWrapper}
`;

/**
 * Field contains all other components and controls canvas size
 */
const Field = ({ wrapperClassName, gridClassName, gridOffset, children }) => {
  const { top = 0, left = 0, bottom = 0, right = 0 } = gridOffset;

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const handleContainerResize = contentRect => {
    setContainerSize({
      width: contentRect.bounds.width,
      height: contentRect.bounds.height,
    });
  };

  const [gridSize, setGridSize] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const handleGridResize = contentRect => {
    setGridSize({
      x: contentRect.bounds.left,
      y: contentRect.bounds.top,
      width: contentRect.bounds.width,
      height: contentRect.bounds.height,
    });
  };

  return (
    <Measure bounds client scroll offset onResize={handleContainerResize}>
      {({ measureRef: mainRef }) => (
        <MainWrapper ref={mainRef} className={wrapperClassName}>
          {children}
          <Measure
            bounds
            client
            scroll
            offset
            onResize={handleGridResize}
          >
            {({ measureRef: gridRef }) => (
              <GridWrapper
                ref={gridRef}
                className={gridClassName}
                top={top}
                left={left}
                right={right}
                bottom={bottom}
              />
            )}
          </Measure>
        </MainWrapper>
      )}
    </Measure>
  );
};

Field.propTypes = {
  /**
   * className for main wrapper. you can use `.yourclass.yourclass`
   * selector or `!important` in css to override styled-components properties
   */
  wrapperClassName: PropTypes.string,
  /**
   * className for grid wrapper
   */
  gridClassName: PropTypes.string,
  /**
   * offset for grid position inside main wrapper
   */
  gridOffset: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
  }),
  /**
   * Children rendered before grid in DOM
   */
  children: PropTypes.node,
};

Field.defaultProps = {
  wrapperClassName: '',
  gridClassName: '',
  gridOffset: { top: 0, left: 0 },
  children: null,
};

export default Field;
