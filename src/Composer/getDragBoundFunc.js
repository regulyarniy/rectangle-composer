export const getDragBoundFunc = ({
  x,
  y,
  canvasWidth,
  canvasHeight,
  width,
  height,
  obstacles,
}) => {
  const position = { x, y };
  const prevPosition = { x, y };

  const hasIntersection = () => {
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

  const isInBounds = () => {
    const left = position.x;
    const right = left + width;
    const MIN_X = 0;
    const top = position.y;
    const bottom = top + height;
    const MIN_Y = 0;

    if (right > canvasWidth) {
      return false;
    } if (left < MIN_X) {
      return false;
    } if (bottom > canvasHeight) {
      return false;
    } if (top < MIN_Y) {
      return false;
    }

    return true;
  };

  return pos => {
    position.x = pos.x;
    position.y = pos.y;

    if (!hasIntersection() && isInBounds()) {
      prevPosition.x = position.x;
      prevPosition.y = position.y;
    }

    return {
      x: prevPosition.x,
      y: prevPosition.y,
    };
  };
};
