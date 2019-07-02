import React from 'react';
import './Cell.css';

interface CellProps {
  widthPercentage: number;
  children?: React.ReactNode;
}

export function Cell(props: CellProps) {
  return (
    <div
      className="Cell"
      style={{
        width: `${props.widthPercentage}%`
      }}
    >
      {props.children}
    </div>
  );
}
