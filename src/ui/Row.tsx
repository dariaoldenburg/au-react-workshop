import React from 'react';
import './Row.css';

interface RowProps {
  children?: React.ReactNode;
}

export function Row(props: { children?: React.ReactNode }) {
  return <div className="Row">{props.children}</div>;
}
