import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Text } from 'react-konva';
import { color } from '@storybook/addon-knobs';
import { EditableRectangle } from '../src';
import { PresetField } from './PresetField';

export const EditableRectangleStory = () => {
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(50);
  const fill = color('custom fill', '#98E3C2');
  const handleEditEnd = dimensions => {
    const { x: newX, y: newY, height: newHeight, width: newWidth } = dimensions;
    action('edit-end')(dimensions);
    setX(newX);
    setY(newY);
    setHeight(newHeight);
    setWidth(newWidth);
  };

  return (
    <PresetField>
      <EditableRectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        onStartEdit={action('start-edit')}
        onEndEdit={handleEditEnd}
      >
        <Text text="child node" y={25} x={0} />
      </EditableRectangle>
    </PresetField>
  );
};
