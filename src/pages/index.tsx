import useWindowDimensions, { WindowDimensions } from '@/hooks/useWindow'
import { FC, useEffect, useMemo, useRef, Ref, useState } from 'react'
import styled, { css, keyframes } from "styled-components";

const InnerBody: FC<{
  boxSize: WindowDimensions,
  windowDimension: WindowDimensions,
}> = ({ boxSize, windowDimension, }) => {

  const ref = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState(Math.floor(Math.random()*16777215).toString(16));
  const [lastEdge, setLastEdge] = useState<'x' | 'y' | null>('x');
  const [deltaX, setDeltaX] = useState([0, 0, 0]);
  const [deltaY, setDeltaY] = useState([0, 0, 0]);

  const edge = useMemo(() => {
    const bufferX = windowDimension.width * 0.01;
    const bufferY = windowDimension.height * 0.01;
    const edgeX = [0, windowDimension.width - boxSize.width];
    const edgeY = [0, windowDimension.height - boxSize.height];

    return [edgeX, edgeY]
  }, [windowDimension, boxSize]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current != null) {
        const {x, y} = ref.current.getBoundingClientRect();
        setDeltaX((prev) => {
          return [prev[1], prev[2], x];
        });
        setDeltaY((prev) => {
          return [prev[1], prev[2], y];
        })
      };
    }, 100)
    return () => {
      clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    const [edgeX] = edge;
    const [t0, t1, t2] = deltaX;
    if(t1 > edgeX[1] /2) {
      // on the right side
      if (t1 > t0 && t1 > t2) {
        setColor(Math.floor(Math.random()*16777215).toString(16));
      }
    } else {
      if (t1 < t0 && t1 < t2) {
        setColor(Math.floor(Math.random()*16777215).toString(16));
      }
    }
  }, [deltaX, edge]);

  useEffect(() => {
    const [_, edgeY] = edge;
    const [t0, t1, t2] = deltaY;
    if(t1 > edgeY[1] /2) {
      // on the right side
      if (t1 > t0 && t1 > t2) {
        setColor(Math.floor(Math.random()*16777215).toString(16));
      }
    } else {
      if (t1 < t0 && t1 < t2) {
        setColor(Math.floor(Math.random()*16777215).toString(16));
      }
    }
  }, [deltaY, edge]);

  return (
    <span 
      ref={ref}
      style={{
        backgroundColor: `#${color}`,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      DVD Player
    </span>
  )
}

const Box: FC<{
  windowDimension: WindowDimensions,
}> = ({ windowDimension }) => {
  const baseSpeed = 5;
  const boxAspectRatio = 16 / 9;
  const boxScaleToWindow = 0.1;

  const boxSize = useMemo(() => {
    const { width } = windowDimension;
    const boxWidth = width * boxScaleToWindow;
    const boxHeight = boxWidth / boxAspectRatio;
    return { width: boxWidth, height: boxHeight };
  }, [windowDimension]);

  const moveX = (width: number) => keyframes`from { left: 0px; } to { left: ${width}px; }`;
  const moveY = (height: number) => keyframes`from { top: 0px; } to { top: ${height}px; }`;

  const StyledBox = styled.div<{
    width: number; 
    height: number, 
    dimension: WindowDimensions, 
    transitionXTime: number, 
    transitionYTime: number,
  }>`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    position: absolute;
    animation: 
      ${props => moveX(props.dimension.width - props.width)} ${({transitionXTime}) => transitionXTime}s linear 0s infinite alternate, 
      ${props => moveY(props.dimension.height - props.height)} ${({transitionYTime}) => transitionYTime}s linear 0s infinite alternate
  `

  return (
    <StyledBox
      id='bouncing-box'
      width={boxSize.width}
      height={boxSize.height}
      transitionXTime={baseSpeed}
      transitionYTime={Math.round(baseSpeed * boxAspectRatio * 10) / 10}
      dimension={windowDimension}
    >
      <InnerBody boxSize={boxSize} windowDimension={windowDimension} />
    </StyledBox>
  )
}

export default function Home() {
  const windowDimension = useWindowDimensions();

  return (
    <>
      <main>
        <div style={{ width: windowDimension.width, height: windowDimension.height }}>
          <Box windowDimension={windowDimension} />
        </div>
      </main>
    </>
  )
}
