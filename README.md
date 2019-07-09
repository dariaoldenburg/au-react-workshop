# AppUnite React Workshops no 1

Let's do a [PolChat](http://applet.polfan.pl/)!

![PolChat screenshot](http://iceq.ikari.pl/images/old_applet.jpg)

Demo app: https://dariaoldenburg.github.io/au-react-workshop/

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

- [ ] (optionally) Create your own `Button` component

### Lesson 2

#### Class Component

[Docs: Converting a Function to a Class](https://reactjs.org/docs/state-and-lifecycle.html#converting-a-function-to-a-class)

```tsx
// Simple component with no props
class Button extends React.Component {
  render() {
    return 'I am a button';
  }
}

// With props
interface ButtonProps {
  label: string;
  onClick?(): void;
}

class Button extends React.Component<ButtonProps> {
  render() {
    return <button onClick={props.onClick}>{props.label}</button>;
  }
}
```

#### State

[Docs: Adding Local State to a Class](https://reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class)

Implementing Accordion:

![Accordion](https://s3.amazonaws.com/media.nngroup.com/media/editor/2014/04/28/jqueryui.png)

```tsx
interface AccordionProps {
  title: string;
  description: string;
}

interface AccordionState {
  extended: boolean;
}

class Accordion extends React.Component<AccordionProps, AccordionState> {
  state: AccordionState = {
    extended: false
  };

  render() {
    const { title, description } = this.props;
    const { extended } = this.state;

    return (
      <div className="Accordion">
        <div
          className="Accordion__title"
          onClick={() => this.setState({ extended: !extended })}
        >
          {title}
        </div>
        {extended && (
          <div className="Accordion__description">{description}</div>
        )}
      </div>
    );
  }
}
```

```tsx
// Better
class Accordion extends React.Component<AccordionProps, AccordionState> {
  state: AccordionState = {
    extended: false
  };

  // Note: binding `this` is important here!
  handleTitleClick = () => {
    this.setState(state => {
      extended: !state.extended;
    });
  };

  render() {
    const { title, description } = this.props;
    const { extended } = this.state;

    return (
      <div className="Accordion">
        <div className="Accordion__title" onClick={this.handleTitleClick}>
          {title}
        </div>
        {extended && (
          <div className="Accordion__description">{description}</div>
        )}
      </div>
    );
  }
}
```

#### Component Lifecycle

[Docs: Adding Lifecycle Methods to a Class](https://reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class)

```tsx
interface ClockState {
  date: Date;
}

class Clock extends React.Component<{}, ClockState> {
  state: ClockState = {
    date: new Date()
  };

  private timerID?: NodeJS.Timeout;

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID!);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return <div>Current time: {this.state.date.toLocaleTimeString()}</div>;
  }
}
```

### Exercise 2

TODO

### Lesson 3

#### Controlled Components

[Docs](https://reactjs.org/docs/forms.html#controlled-components)

```tsx
class NameForm extends React.Component<
  { initialValue: string },
  { value: string }
> {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert('A name was submitted: ' + this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

#### `textarea` tag

Use `value` instead of `children`.

```tsx
<textarea value={this.state.value} onChange={this.handleChange} />
```

#### Data must always flow down

[Docs](https://reactjs.org/docs/state-and-lifecycle.html#the-data-flows-down)

```tsx
// Bad
class Chat extends React.Component<
  {},
  {
    newMessageContent: string;
  }
> {
  state = {
    newMessageContent: ''
  };

  render() {
    return (
      <NewMessageForm
        content={this.state.newMessageContent}
        updateState={this.setState}
      />
    );
  }
}

// Good
class Chat extends React.Component<
  {},
  {
    newMessageContent: string;
  }
> {
  state = {
    newMessageContent: ''
  };

  handleContentChange = (nextContent: string) => {
    this.setState({ newMessageContent: nextContent });
  };

  render() {
    return (
      <NewMessageForm
        content={this.state.newMessageContent}
        onContentChange={this.handleContentChange}
      />
    );
  }
}
```

#### Never mutate props

```tsx
// Bad
interface Props {
  message: Message;
  onChange?(message: Message): void;
}
interface State {
  inEdit: boolean;
}
class MessagePage extends React.Component<Props, State> {
  state: State = {
    inEdit: false
  };

  render() {
    const { message, onChange } = this.props;
    const { inEdit } = this.state;

    return (
      <>
        <MessagePreview message={message} />
        {inEdit && (
          <textarea
            value={message.content}
            onChange={event => {
              message.content = event.target.value;
              if (onChange) {
                onChange(message);
              }
            }}
          />
        )}
      </>
    );
  }
}

// Good
interface Props {
  message: Message;
  onChange?(message: Message): void;
}
interface State {
  inEdit: boolean;
}
class MessagePage extends React.Component<Props, State> {
  state: State = {
    inEdit: false
  };

  render() {
    const { message, onChange } = this.props;
    const { inEdit } = this.state;

    return (
      <>
        <MessagePreview message={message} />
        {inEdit && (
          <textarea
            value={message.content}
            onChange={event => {
              if (onChange) {
                onChange({ ...message, content: event.target.value });
              }
            }}
          />
        )}
      </>
    );
  }
}

// Good as well
interface Props {
  message: Message;
  onChange?(message: Message): void;
}
interface State {
  inEdit: boolean;
  editedMessage: Message;
}
class MessagePage extends React.Component<Props, State> {
  state: State = {
    inEdit: false,
    editedMessage: this.props.message
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps !== this.props.message) {
      this.setState({
        editedMessage: this.props.message
      });
    }
  }

  render() {
    const { onChange } = this.props;
    const { editedMessage, inEdit } = this.state;

    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          onChange(editedMessage);
        }}
      >
        <MessagePreview message={editedMessage} />
        {inEdit && (
          <textarea
            value={editedMessage.content}
            onChange={event => {
              this.setState({
                editedMessage: { ...editedMessage, content: event.target.value }
              });
            }}
          />
        )}
      </form>
    );
  }
}
```

### Exercise 3

Add a possibility to write and submit new messages:

- [ ] Create `MessageBox` component, that:

  - [ ] has following props:

    ```tsx
    interface MessageBoxProps {
      messageContent?: string;
      disabled?: boolean;
      onChange?: (value: string) => void;
      onSubmit?: () => void;
    }
    ```

  - [ ] renders `<textarea>`, that:

    - has value equal to `props.messageContent`
    - triggers `props.onChange` whenever its' value is changed

  - [ ] wraps `<textarea>` with `<form>`, that:

    - triggers `props.onSubmit` when form is submitted

  - [ ] renders a button, that triggers `props.onSubmit` when clicked

  - [ ] when `<textarea>` receives `ENTER` (but not `SHIFT+ENTER`), it triggers `props.onSubmit`

- In `Chat`:

  - [ ] add `newMessageContent: string` to `this.state`

  - [ ] render `MessageBox` and control `this.state.newMessageContent` with it

  - [ ] once `MessageBox#props.onSubmit` is called, call `ChatApi.createMessage()`

### Exercise 3b (optional)

- [ ] Render nested thread messages (`Message.submessages`)

- [ ] Add possibility to add a message to an existing thread (`parentMessageId` in `ChatApi.createMessage(...)`)

### Lesson 4

TODO

### Exercise 4

TODO

## Additional information

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration
