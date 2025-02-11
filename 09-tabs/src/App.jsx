import './App.css';
import Tabs from './components/tabs';

const items = [
  {
    id: 'html',
    label: 'HTML',
    content:
      'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
  },
  {
    id: 'css',
    label: 'CSS',
    content:
      'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML',
  },
  {
    id: 'javascript',
    label: 'JavaScript',
    content:
      'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
  },
];

function App() {
  return <Tabs items={items} />;
}

export default App;
