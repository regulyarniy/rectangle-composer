import React from 'react';
import PropTypes from 'prop-types';
import { Group, Rect } from 'react-konva';

/**
 * Basic rectangle. Use all props konva <Rect/> can take.
 * In compare with <Rect/> the <Rectangle/> can contain nested components
 */
const Rectangle = props => {
  const { x, y, width, height, children, forwardRef, ...rectProps } = props;
  return (
    <Group x={x} y={y}>
      <Rect ref={forwardRef} width={width} height={height} {...rectProps} />
      {children}
    </Group>
  );
};

Rectangle.propTypes = {
  /**
   * x absolute coordinate
   */
  x: PropTypes.number,
  /**
   * y absolute coordinate
   */
  y: PropTypes.number,
  /**
   * width in px
   */
  width: PropTypes.number,
  /**
   * height in px
   */
  height: PropTypes.number,
  /**
   * children rendered on top of rectangle
   * pass any valid nodes for react-konva <Group/> children
   */
  children: PropTypes.node,
  /**
   * forwarded ref to <Rect/>
   */
  forwardRef: PropTypes.shape({}),
};

Rectangle.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  children: null,
  forwardRef: undefined,
};

export default Rectangle;
