import './App.css';
import { ThemeToggler } from './theme-toggler/ThemeToggler';

const App = () => {
  return (
    <div className="content">
      <h1>Client side rendering example in React 19</h1>
      <p>Theme toggler works without ref workaround</p>
      <ThemeToggler />
    </div>
  );
};

export default App;
