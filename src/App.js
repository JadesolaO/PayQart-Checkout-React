import { Col, Row } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Cart from "./components/Cart";
import EmploymentScreen from "./screens/EmploymentScreen";
import PlanScreen from "./screens/PlanScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import CreditScreen from "./screens/CreditScreen";
import CreditApplicationScreen from "./screens/CreditApplicationScreen";

function App() {
  return (
    <Router>
      <Row className='app'>
        <Switch>
          <Route exact path='/'>
            <Col md={7}>
              <Cart />
            </Col>
            <Col md={5}>
              <Route exact path='/' component={EmploymentScreen} />
            </Col>
          </Route>
          <Route exact path='/planscreen'>
            <Col md={7}>
              <Cart />
            </Col>
            <Col md={5}>
              <Route exact path='/planscreen' component={PlanScreen} />
            </Col>
          </Route>

          <Route exact path='/signup'>
            <Col md={7}>
              <Cart />
            </Col>
            <Col md={5}>
              <Route exact path='/signup' component={SignUpScreen} />
            </Col>
          </Route>

          <Route exact path='/signin'>
            <Col md={7}>
              <Cart />
            </Col>
            <Col md={5}>
              <Route exact path='/signin' component={SignInScreen} />
            </Col>
          </Route>

          <Route exact path='/forgotpassword'>
            <Col md={7}>
              <Cart />
            </Col>
            <Col md={5}>
              <Route exact path='/forgotpassword' component={ForgotPasswordScreen} />
            </Col>
          </Route>

          <Route exact path='/creditscreen'>
            <Col md={7}>
              <Cart />
            </Col>
            <Col md={5}>
              <Route exact path='/creditscreen' component={CreditScreen} />
            </Col>
          </Route>

          <Col md={12}>
            <Route exact path='/creditapplication' component={CreditApplicationScreen} />
          </Col>
        </Switch>
      </Row>
    </Router>
  );
}

export default App;
