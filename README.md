# AppUnite React Workshops no 1

## Development

```bash
yarn
npm start
# Open http://localhost:3000
```

## Testing

```bash
# Launches the test runner in the interactive watch mode.
# See https://facebook.github.io/create-react-app/docs/running-tests for more information.
npm test
```

## Lessons

Let's do a [PolChat](http://applet.polfan.pl/)!

![PolChat screenshot](http://iceq.ikari.pl/images/old_applet.jpg)

### Learning resources

- [React documentation](https://reactjs.org/docs/getting-started.html)
- [Typescript documentation](https://www.typescriptlang.org/docs/home.html)

### Lesson 1

#### ReactDOM.render()

[Docs](https://reactjs.org/docs/react-dom.html#render)

```jsx
// JS
const app = React.createElement(App);
ReactDOM.render(App, document.getElementById('root'));

// JSX
const app = <App />;
ReactDOM.render(app, document.getElementById('root'));

// JSX (shorter)
ReactDOM.render(<App />, document.getElementById('root'));
```

#### React.createElement()

[Docs](https://reactjs.org/docs/react-api.html#createelement)

```jsx
// JS
React.createElement('button', {
  className: 'special-button',
  type: 'submit',
  disabled: true,
  children: 'Click me',
  onClick: () => alert('clicked'!)
})

// JSX
<button
  className="special-button"
  type="submit"
  disabled
  onClick={() => alert('clicked'!)}>Click me</button>

// JS
React.createElement(App, { env: 'development' })

// JSX
<App env="development" />
```

#### HTML Element props: i.e. `style`, `className`, `role`

[Docs](https://reactjs.org/docs/dom-elements.html)

```tsx
// bad
<button class="special-button" style={{ 'margin-left': '20px' }} tab-index="0">click</button>

// good
<button className="special-button" style={{ marginLeft: '20px' }} tabIndex={0}>click</button>

// P.S. In `style`, you can pass number instead of `...px`:
<button style={{ marginLeft: 20 }}>click</button>
```

#### Functional Component

[Docs](https://reactjs.org/docs/components-and-props.html)

```tsx
function Button(props: { label: string; onClick?(): void }) {
  return <button onClick={props.onClick}>{props.label}</button>;
}

// Usage
<Button label="Click me!" onClick={() => alert('clicked!')} />;
```

#### Using TS generic types and interfaces

[Docs: TS functions](https://www.typescriptlang.org/docs/handbook/functions.html)

[Docs: TS generic types](https://www.typescriptlang.org/docs/handbook/generics.html)

[Docs: TS interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)

```tsx
interface ButtonProps {
  label: string;
  onClick?(): void;
}

function Button(props: ButtonProps) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

#### Setting default prop values

[Docs](https://reactjs.org/docs/react-component.html#defaultprops)

```tsx
interface ButtonProps {
  label: string;
  disabled: boolean;
  onClick?(): void;
}

function Button(props: ButtonProps) {
  return (
    <button disabled={props.disabled} onClick={props.onClick}>
      {props.label}
    </button>
  );
}

Button.defaultProps = {
  disabled: false
};
```

### Exercise 1

- [ ] Create `Chat` component that renders "I am a chat!"
- [ ] Render `<Chat />` in `App`
- [ ] Create `Row` and `Cell` components with following props:

  ```ts
  interface RowProps {
    children?: React.ReactNode;
  }

  interface CellProps {
    header: boolean;
    padded: boolean;
    scrollable: boolean;
    textAlign: 'left' | 'center' | 'right';
    widthPercentage: number;
    height?: number;
    children?: React.ReactNode;
  }
  ```

- [ ] Make `Row` render just a `div.Row` that renders the children in it

- [ ] Make `Cell` render children in a div, that has following CSS class:

  - `Cell` - always
  - `Cell--header` - when `props.header` is true
  - `Cell--padded` - when `props.padded` is true
  - `Cell--scrollable` - when `props.scrollable` is true
  - `Cell--textAlign-left` - when `props.textAlign === 'left'` (and the same for other textAlign values)

- [ ] In `Cell`, set the div's height to `props.height` px, and `props.widthPercentage` %

- [ ] In `Cell`, provide default prop values for all the props besides `height` and `children`

- [ ] In `Chat`, use the `Row` and `Cell` components to create chat layout, for example:

  - first row composed of two cells:

    - chat title
    - online users count

  - second row composed of two cells:

    - chat messages
    - online users list

  - third row composed of two cells:

    - textarea
    - login button

    Note: You don't have to create any components for the inside stuff of the chat! Instead, you can just print in cells something like `"Here be chat title"` ;)

### 2. TBD

### 3. TBD

### 4. TBD

### 5. TBD

## Additional information

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration
