import React, { Fragment, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Transformer, Group } from 'react-konva';
import Rectangle from '../Rectangle';

let debounceSizeChangeTimeout = null;
let debounceCoordinatesChangeTimeout = null;
const DEBOUNCE_DELAY = 10;
const TWEEN_DURATION = 0.3;

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

  const [isEdited, setIsEdited] = useState(false);

  const groupRef = forwardRef || useRef();
  const rectRef = useRef();
  const transformerRef = useRef();

  const updateScene = () => {
    transformerRef.current.forceUpdate();
    transformerRef.current.getLayer().batchDraw();
  };

  useEffect(() => {
    transformerRef.current.attachTo(groupRef.current);
    groupRef.current.x(x);
    groupRef.current.y(y);
    rectRef.current.width(width);
    rectRef.current.height(height);
    updateScene();
  }, []);

  useEffect(() => {
    if (!isEdited) {
      clearTimeout(debounceSizeChangeTimeout);
      debounceSizeChangeTimeout = setTimeout(() => {
        const rect = rectRef.current;
        const group = groupRef.current;

        const childNodes = group.getChildren(
          node => node.getClassName() !== 'Rect',
        );
        childNodes.forEach(node => node.opacity(0));
        updateScene();

        rect.to({
          width,
          height,
          onFinish: () => {
            group.scaleX(1);
            group.scaleY(1);
            updateScene();
            childNodes.forEach(node => node.to({ duration: TWEEN_DURATION, opacity: 1 }));
          },
        });
      }, DEBOUNCE_DELAY);
    } else {
      updateScene();
    }
  }, [width, height]);

  useEffect(() => {
    if (!isEdited) {
      clearTimeout(debounceCoordinatesChangeTimeout);
      debounceCoordinatesChangeTimeout = setTimeout(() => {
        const group = groupRef.current;

        const childNodes = group.getChildren(
          node => node.getClassName() !== 'Rect',
        );
        childNodes.forEach(node => node.opacity(0));
        updateScene();

        groupRef.current.to({
          x,
          y,
          duration: TWEEN_DURATION,
          onFinish: () => {
            updateScene();
            childNodes.forEach(node => node.to({ duration: TWEEN_DURATION, opacity: 1 }));
          },
        });
      }, DEBOUNCE_DELAY);
    } else {
      updateScene();
    }
  }, [x, y]);

  const handleStartEdit = event => {
    // eslint-disable-next-line no-param-reassign
    event.cancelBubble = true;
    setIsEdited(true);
    onStartEdit();
  };

  const handleDragEnd = event => {
    const { x: newX, y: newY } = event.target.attrs;
    onEndEdit({ x: newX, y: newY, width, height });
    setIsEdited(false);
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
    setIsEdited(false);
  };

  const handleMouseEnter = () => {
    groupRef.current.getStage().container().style.cursor = 'move';
  };

  const handleMouseLeave = () => {
    groupRef.current.getStage().container().style.cursor = 'default';
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
      >
        <Rectangle forwardRef={rectRef} {...rectProps}>
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
