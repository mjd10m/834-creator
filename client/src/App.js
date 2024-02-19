import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import MultiTrans from './components/multiTrans'
import SingleTrans from './components/singleTrans'


function App() {
  return (
    <Tabs
    defaultActiveKey="single"
    id="uncontrolled-tab-example"
    className="mb-3"
  >
    <Tab eventKey="single" title="Single Transaction">
      <SingleTrans />
    </Tab>
    <Tab eventKey="multi" title="Multiple Transaction">
      <MultiTrans />
    </Tab>
  </Tabs>
  );
}

export default App;
