import React, {useEffect, useRef} from 'react';
import {PillCell} from './pillcell';

interface IPillContainersProps {
  size: number,
  containerSize: number,
  arrow?: [number, number],
  highlight?: Set<number>,
  highlightColor?: string
}

/**
 * A full pillcontainers diagram
 * contains divs for "pillweek"s, which are containers
 * and those contain pillcells.
 * @param props size, containersize, arrow and highlighting
 * @returns TSX
 */
export function PillContainers(props: IPillContainersProps): JSX.Element {
  const getCellColor = (i: number) => {
    if (i >= props.size) return 'darkgray';
    if (props.highlight && props.highlight.has(i)) return 'yellow';
    return '';
  };
  const numContainers = Math.ceil(props.size/props.containerSize);
  const pillCells = Array(numContainers*props.containerSize).fill(0)
      .map((r, i) =>
        <PillCell number={i} numVis={i < props.size} key={i} color={getCellColor(i)}/>,
      );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cWidth = props.containerSize*64 + 14;
  const cHeight = numContainers*81 + 5;
  const getCoords = (cellNum: number): [number, number] => {
    return [64*(cellNum % props.containerSize)+39, 86*Math.floor(cellNum / props.containerSize)+43];
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (canvas && context && props.arrow) {
      ((ctx) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        canvasArrow(ctx, ...getCoords(props.arrow[0]), ...getCoords(props.arrow[1]));
        ctx.stroke()
        ;
      })(context);
    }
  }, [props.arrow]);
  return (
    <>
      <div className="pillcontainers">
        <div className="pillweeks">
          {
            Array(numContainers).fill(0).map((v, container) => {
              return (
                <div
                  className="pillweek"
                  style={{width: `${props.containerSize*64}px`}}
                  key={container}
                >
                  {pillCells.slice(container*props.containerSize,
                      (container+1)*props.containerSize)}
                </div>
              );
            })
          }
        </div>
        <canvas ref={canvasRef} width={cWidth} height={cHeight} />
      </div>
    </>
  );
}

/** Draws a double-headed arrow between two points on a canvas
 *
 * This function is modified from one on SO:
 * https://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag
 *
 * @param context canvas context to draw arrow on
 * @param fromx x coord 1
 * @param fromy y coord 1
 * @param tox x coord 2
 * @param toy y coord 2
 * @returns void
 */
function canvasArrow(
    context:CanvasRenderingContext2D, fromx:number, fromy:number, tox:number, toy:number): void {
  const headlen = 10; // length of head in pixels
  const dx = tox - fromx;
  const dy = toy - fromy;
  const angle = Math.atan2(dy, dx);
  context.moveTo(fromx, fromy);
  context.lineTo(fromx + headlen * Math.cos(angle - Math.PI / 6),
      fromy + headlen * Math.sin(angle - Math.PI / 6));
  context.moveTo(fromx, fromy);
  context.lineTo(fromx + headlen * Math.cos(angle + Math.PI / 6),
      fromy + headlen * Math.sin(angle + Math.PI / 6));
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6),
      toy - headlen * Math.sin(angle - Math.PI / 6));
  context.moveTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6),
      toy - headlen * Math.sin(angle + Math.PI / 6));
}
