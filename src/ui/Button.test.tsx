import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from './Button';
import { Simulate } from 'react-dom/test-utils';

it('renders the button element', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Button>text</Button>, div);

  const button = div.querySelector('button')!;
  expect(button).toBeTruthy();

  expect(button.textContent).toEqual('text');

  ReactDOM.unmountComponentAtNode(div);
});

it('calls onClick on click', () => {
  const onClick = jest.fn();
  const div = document.createElement('div');
  ReactDOM.render(<Button onClick={onClick} />, div);

  const button = div.querySelector('button')!;

  Simulate.click(button);
  expect(onClick).toHaveBeenCalledTimes(1);

  ReactDOM.unmountComponentAtNode(div);
});
