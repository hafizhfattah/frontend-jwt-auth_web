import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import ProductList from "./components/products/ProductList";
import ProductAdd from "./components/products/ProductAdd";
import ProductEdit from "./components/products/ProductEdit";

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/dashboard">
            <Navbar/>
            <Dashboard/>
          </Route>
          <Route path="/product">
            <Navbar/>
            <div className="container">
              <div className="columns">
                <div className="column">
                  <ProductList />
                </div>
              </div>
            </div>
          </Route>
          <Route path="/products/add">
            <Navbar/>
            <div className="container">
              <div className="columns">
                <div className="column">
                  <ProductAdd/>
                </div>
              </div>
            </div>
          </Route>
          <Route path="/products/edit/:id">
            <Navbar/>
            <div className="container">
              <div className="columns">
                <div className="column">
                  <ProductEdit/>
                </div>
              </div>
            </div>
          </Route>      
        </Switch>
      </BrowserRouter>
  );
}

export default App;
