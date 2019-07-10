import React from 'react';
import classNames from 'classnames';
import './Cell.css';

interface CellProps {
  header: boolean;
  padded: boolean;
  scrollable?: boolean;
  textAlign: 'left' | 'center' | 'right';
  widthPercentage: number;
  height?: number;
  children?: React.ReactNode;
}

export function Cell(props: CellProps) {
  return (
    <div
      className={classNames('Cell', {
        'Cell--header': props.header,
        'Cell--padded': props.padded,
        'Cell--scrollable': props.scrollable,
        [`Cell--textAlign-${props.textAlign}`]: props.textAlign
      })}
      style={{
        width: `${props.widthPercentage}%`,
        height: props.height
      }}
    >
      {props.children}
    </div>
  );
}

Cell.defaultProps = {
  header: false,
  padded: true,
  scrollable: false,
  textAlign: 'left'
};
