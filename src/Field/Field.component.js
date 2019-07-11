import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Measure from 'react-measure';
import { Stage, Layer } from 'react-konva';

import * as styles from './Field.style';

const MainWrapper = styled.div`
  ${styles.mainWrapper}
`;

const GridWrapper = styled.div`
  ${styles.gridWrapper}
`;

/**
 * Field creates Konva Stage and controls canvas size
 */
const Field = ({
  wrapperClassName,
  gridClassName,
  gridOffset,
  preContent,
  passedContext,
  children,
  stageProps,
  onGridResize,
}) => {
  const { top = 0, left = 0, bottom = 0, right = 0 } = gridOffset;
  const { Consumer, Provider } = passedContext;

  const [gridSize, setGridSize] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const handleGridResize = contentRect => {
    const gridDimentsions = {
      x: contentRect.bounds.left,
      y: contentRect.bounds.top,
      width: contentRect.bounds.width,
      height: contentRect.bounds.height,
    };
    setGridSize(gridDimentsions);
    onGridResize(gridDimentsions);
  };

  return (
    <MainWrapper className={wrapperClassName}>
      {preContent}
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
          >
            <Consumer>
              {value => (
                <Stage
                  width={gridSize.width}
                  height={gridSize.height}
                  {...stageProps}
                >
                  <Provider value={value}>
                    <Layer>
                      {children}
                    </Layer>
                  </Provider>
                </Stage>
              )}
            </Consumer>
          </GridWrapper>
        )}
      </Measure>
    </MainWrapper>
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
   * preContent rendered before grid in DOM.
   * It could be used to render axis for example.
   * It should use position absolute to not interference with grid
   */
  preContent: PropTypes.node,
  /**
   * Context that should be passed to konva components inside stage
   * It's workaround for react-konva behavior: https://github.com/konvajs/react-konva/issues/188#issuecomment-478302062
   */
  passedContext: PropTypes.shape({
    Provider: PropTypes.object,
    Consumer: PropTypes.object,
  }),
  /**
   * Children nodes rendered in canvas
   * It should be react-konva components valid for rendering inside <Layer/>!
   * For example <Text/>, <Image/>, <Group/> etc. and <React.Fragment/> for wrapping
   */
  children: PropTypes.node,
  /**
   * Props you need to pass to Stage component. i.e. onClick
   */
  stageProps: PropTypes.shape({}),
  /**
   * Callback for grid resize events
   * returns {x, y, width, height}
   */
  onGridResize: PropTypes.func,
};

Field.defaultProps = {
  wrapperClassName: '',
  gridClassName: '',
  gridOffset: { top: 0, left: 0 },
  preContent: null,
  passedContext: createContext({}),
  children: null,
  stageProps: {},
  onGridResize: () => {},
};

export default Field;
