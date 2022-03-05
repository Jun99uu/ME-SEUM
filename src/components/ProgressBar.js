import styled, { css, keyframes } from "styled-components";

const move = (width) => keyframes`0%{
  width:0px;
} 100%{width:${width}%}`;

const Bar = styled.div`
  width: ${(props) => props.width}%;
  height: 50px;
  background-color: ${(props) => props.color};
  border-radius: 1rem;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);

  ${(props) =>
    props.inner &&
    css`
      animation: ${(props) => move(props.width)} 1s;
    `}
`;

function ProgressBar({ children, width, color, moving, ...props }) {
  return (
    <div>
      <Bar width={width} color={color} moving={moving} {...props}>
        {children}
      </Bar>
    </div>
  );
}

export default ProgressBar;
