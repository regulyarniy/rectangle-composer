import React, { Fragment, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Transformer, Group } from 'react-konva';
import Rectangle from '../Rectangle';

/**
 * Draggable & Resizable Rectangle
 */
const EditableRectangle = props => {
  const {
    children,
    dragBoundFunc,
    boundBoxFunc,
    transformerOptions,
    forwardRef,
    x,
    y,
    width,
    height,
    onStartEdit,
    onEndEdit,
    ...rectProps
  } = props;

  const groupRef = forwardRef || useRef();
  const rectRef = useRef();
  const transformerRef = useRef();

  useEffect(() => {
    transformerRef.current.attachTo(groupRef.current);
    transformerRef.current.forceUpdate();
    transformerRef.current.getLayer().batchDraw();
  }, [x, y, width, height]);

  const handleStartEdit = event => {
    // eslint-disable-next-line no-param-reassign
    event.cancelBubble = true;
    onStartEdit();
  };

  const handleDragEnd = event => {
    const { x: newX, y: newY } = event.target.attrs;
    onEndEdit({ x: newX, y: newY, width, height });
  };

  const handleResizeEnd = () => {
    const rect = rectRef.current;
    const group = groupRef.current;
    const newWidth = rect.getClientRect().width;
    const newHeight = rect.getClientRect().height;

    group.scale({ x: 1, y: 1 });
    rect.width(newWidth);
    rect.height(newHeight);

    onEndEdit({
      x: group.x(),
      y: group.y(),
      width: newWidth,
      height: newHeight,
    });
  };

  const handleMouseEnter = () => {
    groupRef.current.getStage().container().style.cursor = 'move';
  };

  const handleMouseLeave = () => {
    groupRef.current.getStage().container().style.cursor = 'default';
  };

  const handleEditableClick = event => {
    // eslint-disable-next-line no-param-reassign
    event.cancelBubble = true;
  };

  return (
    <Fragment>
      <Group
        ref={groupRef}
        draggable
        dragBoundFunc={dragBoundFunc}
        onDragStart={handleStartEdit}
        onDragEnd={handleDragEnd}
        onTransformStart={handleStartEdit}
        onTransformEnd={handleResizeEnd}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        x={x}
        y={y}
        onClick={handleEditableClick}
      >
        <Rectangle width={width} height={height} forwardRef={rectRef} {...rectProps}>
          {children}
        </Rectangle>
      </Group>
      <Transformer
        ref={transformerRef}
        rotateEnabled={false}
        borderEnabled={false}
        anchorSize={15}
        anchorStroke="transparent"
        anchorFill="transparent"
        boundBoxFunc={boundBoxFunc}
        {...transformerOptions}
      />
    </Fragment>
  );
};

EditableRectangle.propTypes = {
  /**
   * children rendered inside edited rectangle
   */
  children: PropTypes.node,
  /**
   * lambda for dragging coordinates transforming
   * https://konvajs.org/api/Konva.Node.html#dragBoundFunc__anchor
   */
  dragBoundFunc: PropTypes.func,
  /**
   * lambda for resizing coordinates transforming
   * https://konvajs.org/api/Konva.Transformer.html#boundBoxFunc
   */
  boundBoxFunc: PropTypes.func,
  /**
   * custom props passed to <Transformer/>
   */
  transformerOptions: PropTypes.shape({}),
  /**
   * forwarded ref to transformable <Group/>
   * useful for example when you need compare click target with edited element in parent
   */
  forwardRef: PropTypes.shape({}),
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
   * callback for start resize or drag
   */
  onStartEdit: PropTypes.func,
  /**
   * callback for end resize or drag
   * returns {x, y, width, height}
   */
  onEndEdit: PropTypes.func,
};

EditableRectangle.defaultProps = {
  children: null,
  dragBoundFunc: pos => pos,
  boundBoxFunc: (oldBox, newBox) => newBox,
  transformerOptions: {},
  forwardRef: undefined,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  onStartEdit: () => {},
  onEndEdit: () => {},
};

export default EditableRectangle;
