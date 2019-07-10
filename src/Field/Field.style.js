import { css } from 'styled-components';

export const mainWrapper = css`
  width: 100%;
  position: relative;
`;


export const gridWrapper = css`
  position: absolute;
  left: ${({ left }) => `${left}px` || 0};
  top: ${({ top }) => `${top}px` || 0};
  right: ${({ right }) => `${right}px` || 0};
  bottom: ${({ bottom }) => `${bottom}px` || 0};
  width: ${({ left, right }) => `calc(100% - ${left + right}px)`};
  height: ${({ top, bottom }) => `calc(100% - ${top + bottom}px)`};
`;
