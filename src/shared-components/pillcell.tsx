import React from 'react';

interface PillCellProps {
  number: number,
  contents?: any,
  color?: string,
  numVis: boolean,
}

/**
 * A single cell in a diagram of pill containers.
 *
 * @param props number, contents, whether the number is visible, and color
 * @returns TSX for a single pillcell
 */
export function PillCell(props: PillCellProps) {
  return (
    <div
      className="pillcell"
      style={{backgroundColor: props.color ? props.color : '#dfdfdf'}}
      key={props.number}
    >
      <div className="cellnumber">
        {props.numVis ? props.number+1 : '-'}
      </div>
      {props.contents}
    </div>
  );
}
