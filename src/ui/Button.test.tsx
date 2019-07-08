import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from './Button';
import { Simulate } from 'react-dom/test-utils';

let div: HTMLDivElement;
beforeEach(() => {
  div = document.createElement('div');
});
afterEach(() => {
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the button element', () => {
  ReactDOM.render(<Button>text</Button>, div);

  const button = div.querySelector('button')!;
  expect(button).toBeTruthy();
  expect(button.textContent).toEqual('text');
});

it('calls onClick on click', () => {
  const onClick = jest.fn();
  ReactDOM.render(<Button onClick={onClick} />, div);

  const button = div.querySelector('button')!;
  Simulate.click(button);
  expect(onClick).toHaveBeenCalledTimes(1);
});
