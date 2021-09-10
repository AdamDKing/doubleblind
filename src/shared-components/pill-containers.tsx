import React, {createRef, useEffect, useRef, useState} from 'react';
import {serialize} from 'v8';
import {PILL} from '../enums';
import {PillCell} from './pillcell';
import Xarrow from 'react-xarrows';

interface IPillContainersProps {
  size: number,
  containerSize: number,
  arrow?: [number, number],
  highlight?: Set<number>,
  highlightColor?: string
}

/**
 * A full pillcontainers diagram
 * @param props
 * @returns 
 */
export function PillContainers(props: IPillContainersProps) {
  const getCellColor = (i: number) => {
    if (i >= props.size) return 'darkgray';
    if (props.highlight && props.highlight.has(i)) return 'yellow';
    return '';
  } 
  const numContainers = Math.ceil(props.size/props.containerSize);
  const pillCells = Array(numContainers*props.containerSize).fill(0)
    .map((r, i) => <PillCell number={i} numVis={i < props.size} key={i} color={getCellColor(i)}/>)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cWidth = props.containerSize*64 + 14;
  const cHeight = numContainers*81 + 5;
  const getCoords = (cellNum: number): [number, number] => {
    return [64*(cellNum % props.containerSize)+39, 86*Math.floor(cellNum / props.containerSize)+43]
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (canvas && context && props.arrow) {
      ((ctx) => {
      ctx.clearRect(0,0, canvas.width, canvas.height)
      ctx.beginPath()
      canvas_arrow(ctx, ...getCoords(props.arrow[0]), ...getCoords(props.arrow[1]))
      ctx.stroke()})(context)
    }
  }, [props.arrow])
  return (
    <>
    <div className="pillcontainers">
      <div className="pillweeks">
      {
        Array(numContainers).fill(0).map((v, container) => {
          return (
            <div className="pillweek" style={{width: `${props.containerSize*64}px`}} key={container}>{
              pillCells.slice(container*props.containerSize, (container+1)*props.containerSize)
            }</div>
          );
        })
      }
      </div>
      <canvas ref={canvasRef} width={cWidth} height={cHeight} />
      </div>
    </>
  );
}
//Yoinked from https://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag
function canvas_arrow(context:CanvasRenderingContext2D, fromx:number, fromy:number, tox:number, toy:number) {
  var headlen = 10; // length of head in pixels
  var dx = tox - fromx;
  var dy = toy - fromy;
  var angle = Math.atan2(dy, dx);
  context.moveTo(fromx, fromy);
  context.lineTo(fromx + headlen * Math.cos(angle - Math.PI / 6), fromy + headlen * Math.sin(angle - Math.PI / 6));
  context.moveTo(fromx, fromy);
  context.lineTo(fromx + headlen * Math.cos(angle + Math.PI / 6), fromy + headlen * Math.sin(angle + Math.PI / 6));
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
  context.moveTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}