import React, {RefObject, useState} from 'react';
import {MutableRefObject} from 'react';
import {preProcessFile} from 'typescript';

/**
 * A single cell in a diagram of pill containers.
 */
export function PillCell(props: PillCellProps) {
  return (
    <div className="pillcell" style={{backgroundColor: props.color ? props.color : '#dfdfdf'}} key={props.number}>
      {props.numVis ? <div className="cellnumber">{props.number+1}</div> : <div className="cellnumber">-</div>}
      {props.contents}
    </div>
  );
}

interface PillCellProps {
  number: number,
  contents?: any,
  color?: string,
  numVis: boolean,
}
