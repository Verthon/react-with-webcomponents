import './App.css';
import { ThemeToggler, NotWorkingThemeToggler } from './theme-toggler/ThemeToggler';

const App = () => {
  return (
    <div className="content">
      <h1>Client side rendering example in React 18</h1>
      <p>Play around with the "NotWorkingThemeToggler" to discover issues mentioned in the article</p>
      <NotWorkingThemeToggler />
    </div>
  );
};

export default App;
