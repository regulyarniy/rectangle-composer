import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Field from '../Field';
import Rectangle from '../Rectangle';

/**
 * Composer is a 2D plane where you can add and edit rectangles with intersection checks
 */
const Composer = props => {
  const { initialRectangles, relativeWidth, relativeHeight } = props;

  const [gridDimensions, setGridDimensions] = useState({ x: 0, y: 0, width: 1, height: 1 });

  const widthRatio = gridDimensions.width / relativeWidth;

  const heightRatio = gridDimensions.height / relativeHeight;

  const visualizedRectangles = initialRectangles
    .map(({ top, left, bottom, right, ...rest }) => ({
      x: left * widthRatio,
      y: top * heightRatio,
      width: (right - left) * widthRatio,
      height: (bottom - top) * heightRatio,
      ...rest,
    }))
    // eslint-disable-next-line react/no-array-index-key
    .map((rectProps, index) => <Rectangle key={`rect-${index}`} {...rectProps} />);

  const wrapperStyles = 'background-color: #C0D6DF; width: 100%; height: 400px;';
  const gridStyles = 'background-color: #B8BBAA;';

  return (
    <Fragment>
      <style>
        {`.composer.composer {${wrapperStyles}}`}
        {`.composer .grid {${gridStyles}}`}
      </style>
      <Field
        onGridResize={setGridDimensions}
        wrapperClassName="composer"
        gridClassName="grid"
      >
        {visualizedRectangles}
      </Field>
    </Fragment>
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
   * in fact it a bound for possible rectangle dimensions
   */
  relativeWidth: PropTypes.number.isRequired,
  /**
   * maximum height in relative units
   * in fact it a bound for possible rectangle dimensions
   */
  relativeHeight: PropTypes.number.isRequired,
};

Composer.defaultProps = {

};

export default Composer;
