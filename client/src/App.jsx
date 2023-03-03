import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Car } from './components/car/car';
import { Customer } from './components/customer/customer';
import { Order } from './components/order/order';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>} ></Route>
          <Route path="/car" element={<Car/>} ></Route>
          <Route path="/customer" element={<Customer/>} ></Route>
          <Route path="/order" element={<Order/>} ></Route>
        </Routes>
    </Router>
  );
}

const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>Team 1</p>
        <nav>
          <div>
            <Link to="/car">Car</Link>
          </div>
          <div>
            <Link to="/customer">Customer</Link>
          </div>
          <div>
            <Link to="/order">Order</Link>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default App;
