import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-konva';
import Field from '../Field';
import Rectangle from '../Rectangle';
import EditableRectangle from '../EditableRectangle';
import { getDragBoundFunc } from './getDragBoundFunc';
import { getBoundBoxFunc } from './getBoundBoxFunc';

/**
 * Composer is a 2D plane where you can add and edit rectangles with intersection checks.
 * Click on empty space to create rectangle.
 * Click on existing rectangle to edit.
 * All relative units passed to Composer is recalculated responsively to grid size.
 */
const Composer = props => {
  const {
    initialRectangles,
    relativeWidth,
    relativeHeight,
    wrapperClassName,
    gridClassName,
    onChange,
    newRectangleProps,
  } = props;

  const [rectangles, setRectangles] = useState(initialRectangles);

  const [editedIndex, setEditedIndex] = useState(null);

  const [gridDimensions, setGridDimensions] = useState({ x: 0, y: 0, width: 1, height: 1 });

  const handleSwitchEditedRectangle = index => event => {
    // eslint-disable-next-line no-param-reassign
    event.cancelBubble = true;
    setEditedIndex(index);
  };

  const widthRatio = gridDimensions.width / relativeWidth;

  const heightRatio = gridDimensions.height / relativeHeight;

  const getRectProps = ({ top, left, bottom, right, ...rest }, index) => ({
    ...rest,
    x: left * widthRatio,
    y: top * heightRatio,
    width: (right - left) * widthRatio,
    height: (bottom - top) * heightRatio,
    index,
  });

  const rectanglesWithoutEdited = rectangles
    .map(getRectProps)
    .filter(rectProps => rectProps.index !== editedIndex);

  const visualizedRectangles = rectanglesWithoutEdited
    .map(rectProps => (
      <Rectangle
        key={`rect-${rectProps.index}`}
        onClick={handleSwitchEditedRectangle(rectProps.index)}
        {...rectProps}
      />
    ));

  const handleUpdateEditedRectangle = ({ x, y, width, height }) => {
    const newRectangles = JSON.parse(JSON.stringify(rectangles));
    const left = x / widthRatio;
    const top = y / heightRatio;
    const right = left + width / widthRatio;
    const bottom = top + height / heightRatio;
    newRectangles[editedIndex] = { ...newRectangles[editedIndex], left, top, right, bottom };
    setRectangles(newRectangles);
    onChange(newRectangles);
  };

  const isEditMode = editedIndex === null;

  const editedRectangleProps = isEditMode
    ? null
    : getRectProps(rectangles[editedIndex], editedIndex);

  const boundParamsForIntersectionPreventing = isEditMode ? null : {
    x: editedRectangleProps.x,
    y: editedRectangleProps.y,
    canvasWidth: gridDimensions.width,
    canvasHeight: gridDimensions.height,
    width: editedRectangleProps.width,
    height: editedRectangleProps.height,
    obstacles: rectanglesWithoutEdited,
  };

  const editedRectangle = isEditMode
    ? null
    : (
      <EditableRectangle
        onEndEdit={handleUpdateEditedRectangle}
        {...editedRectangleProps}
        dragBoundFunc={getDragBoundFunc(boundParamsForIntersectionPreventing)}
        boundBoxFunc={getBoundBoxFunc(boundParamsForIntersectionPreventing)}
      >
        <Text text="*" fontSize={20} fill="black" />
        <Text x={5} text="*" fontSize={20} fill="white" />
      </EditableRectangle>
    );

  const handleAddRectangle = event => {
    // eslint-disable-next-line no-param-reassign
    event.cancelBubble = true;
    const { layerX: x, layerY: y } = event.evt;
    const { width, height, ...restRectangleProps } = newRectangleProps;
    const newRectangles = JSON.parse(JSON.stringify(rectangles));
    const left = x / widthRatio;
    const top = y / heightRatio;
    const right = left + width;
    const bottom = top + height;
    newRectangles.push({ ...restRectangleProps, left, top, right, bottom });
    setRectangles(newRectangles);
    onChange(newRectangles);
  };

  return (
    <Field
      onGridResize={setGridDimensions}
      wrapperClassName={wrapperClassName}
      gridClassName={gridClassName}
      stageProps={{ onClick: handleAddRectangle }}
    >
      {visualizedRectangles}
      {editedRectangle}
    </Field>
  );
};

Composer.propTypes = {
  /**
   * initial rectangles dimensions in relative units
   * additionally you can pass any props for styling or events
   * https://konvajs.org/api/Konva.Rect.html
   */
  initialRectangles: PropTypes.arrayOf(PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    bottom: PropTypes.number,
    right: PropTypes.number,
  })).isRequired,
  /**
   * maximum width in relative units
   * in fact it is a bound for possible rectangle dimensions
   */
  relativeWidth: PropTypes.number.isRequired,
  /**
   * maximum height in relative units
   * in fact it is a bound for possible rectangle dimensions
   */
  relativeHeight: PropTypes.number.isRequired,
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
   * callback for changes
   * return array of new rectangles
   */
  onChange: PropTypes.func,
  /**
   * New rectangle props
   * At least width and height in relative units is required
   */
  newRectangleProps: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
};

Composer.defaultProps = {
  wrapperClassName: '',
  gridClassName: '',
  onChange: () => {},
  newRectangleProps: { width: 10, height: 10, fill: 'black' },
};

export default Composer;
