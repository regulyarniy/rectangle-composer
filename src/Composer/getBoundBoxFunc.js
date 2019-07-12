export const getBoundBoxFunc = ({
  x,
  y,
  canvasWidth,
  canvasHeight,
  width,
  height,
  obstacles,
}) => {
  const position = { x, y };
  const prevSize = { width, height };
  const prevPosition = { x, y };

  // eslint-disable-next-line no-shadow
  const hasIntersection = ({ width, height }) => {
    const left = position.x;
    const top = position.y;
    const bottom = top + height;
    const right = left + width;

    // eslint-disable-next-line no-restricted-syntax
    for (const obstacle of obstacles) {
      const obstacleLeft = obstacle.x;
      const obstacleRight = obstacle.x + obstacle.width;
      const obstacleTop = obstacle.y;
      const obstacleBottom = obstacle.y + obstacle.height;
      if (
        !(
          top > obstacleBottom
          || bottom < obstacleTop
          || left > obstacleRight
          || right < obstacleLeft
        )
      ) {
        return true;
      }
    }

    return false;
  };

  // eslint-disable-next-line no-shadow
  const isInBounds = ({ width, height }) => {
    const left = position.x;
    const right = left + width;
    const MIN_X = 0;
    const top = position.y;
    const bottom = top + height;
    const MIN_Y = 0;
    const MIN_WIDTH = 1;
    const MIN_HEIGHT = 1;

    return !(
      right > canvasWidth
      || left < MIN_X
      || bottom > canvasHeight
      || top < MIN_Y
      || width < MIN_WIDTH
      || height < MIN_HEIGHT
    );
  };

  return (oldBox, newBox) => {
    position.x = newBox.x;
    position.y = newBox.y;
    // eslint-disable-next-line no-shadow
    const { width, height } = newBox;

    if (!hasIntersection({ width, height }) && isInBounds({ width, height })) {
      prevPosition.x = position.x;
      prevPosition.y = position.y;
      prevSize.width = width;
      prevSize.height = height;
    }

    return { ...prevPosition, ...prevSize };
  };
};
