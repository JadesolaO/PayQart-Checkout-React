import { Col, Row } from "react-bootstrap"
import { Route } from "react-router-dom"
import Cart from "./components/Cart"
import PlanScreen from "./screens/PlanScreen"
import SignUpScreen from "./screens/SignUpScreen"
import SignInScreen from "./screens/SignInScreen"
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen"
import CreditScreen from "./screens/CreditScreen"
import CreditApplicationScreen from "./screens/CreditApplicationScreen"
import EmploymentScreen from "./screens/EmploymentScreen"
import WalletStatusScreen from "./screens/WalletStatusScreen"
import EligibilityScreen from "./screens/EligibilityScreen"
import SuccessScreen from "./screens/SuccessScreen"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Checkout from "./screens/Checkout"
// import Alert from "./components/Alert"

function App() {
  return (
    <>
      {/* <Alert /> */}
      <ToastContainer />
      <Row className="app">
        <Route exact path="/">
          <Col className="checkout" md={12}>
            <Route exact path="/" component={Checkout} />
          </Col>
        </Route>

        <Route exact path="/:orderId/status">
          <Col className="eligibityscreen" md={12}>
            <Route
              exact
              path="/:orderId/status"
              component={WalletStatusScreen}
            />
          </Col>
        </Route>

        <Route exact path="/:orderId/eligibityscreen">
          <Col className="eligibityscreen" md={12}>
            <Route
              exact
              path="/:orderId/eligibityscreen"
              component={EligibilityScreen}
            />
          </Col>
        </Route>

        <Route exact path="/:orderId/employmentscreen">
          <Col md={7}>
            <Cart />
          </Col>
          <Col md={5}>
            <Route
              exact
              path="/:orderId/employmentscreen"
              component={EmploymentScreen}
            />
          </Col>
        </Route>
        <Route exact path="/:orderId/planscreen">
          <Col md={7}>
            <Cart />
          </Col>
          <Col md={5}>
            <Route exact path="/:orderId/planscreen" component={PlanScreen} />
          </Col>
        </Route>

        <Route exact path="/signup/:status">
          <Col md={7}>
            <Cart />
          </Col>
          <Col md={5}>
            <Route exact path="/signup/:status" component={SignUpScreen} />
          </Col>
        </Route>

        <Route exact path="/signin/:status">
          <Col md={7}>
            <Cart />
          </Col>
          <Col md={5}>
            <Route exact path="/signin/:status" component={SignInScreen} />
          </Col>
        </Route>

        <Route exact path="/forgotpassword">
          <Col md={7}>
            <Cart />
          </Col>
          <Col md={5}>
            <Route
              exact
              path="/forgotpassword"
              component={ForgotPasswordScreen}
            />
          </Col>
        </Route>

        <Route exact path="/:orderId/creditscreen">
          <Col md={7}>
            <Cart />
          </Col>
          <Col md={5}>
            <Route
              exact
              path="/:orderId/creditscreen"
              component={CreditScreen}
            />
          </Col>
        </Route>

        <Col md={12}>
          <Route
            path="/:orderId/creditapplication"
            component={CreditApplicationScreen}
          />
        </Col>

        <Route exact path="/success:redirectParam">
          <Col className="successScreen" md={12}>
            <Route
              exact
              path="/success:redirectParam"
              component={SuccessScreen}
            />
          </Col>
        </Route>
      </Row>
    </>
  )
}

export default App
