import { useEffect } from "react"
import axios from "axios"
import { Button, Row, Col, Image } from "react-bootstrap"
import { useHistory } from "react-router-dom"
// import CartItem from "../components/CartItem"
import apiEndpoint from "../utils/apiEndpoint"

import { v4 } from "uuid"

const Checkout = () => {
  let history = useHistory()

  useEffect(() => {
    localStorage.removeItem("personalInfoObj")
    localStorage.removeItem("contactInfoObj")
    localStorage.removeItem("employmentInfoObj")
    localStorage.removeItem("bankInfoObj")
    localStorage.removeItem("refereeInfoObj")
  }, [])

  async function checkoutHandler() {
    const obj = {
      products: [
        {
          productName: "Samsung A51",
          quantity: 1,
          price: 20000,
          imageUrl: "https://www.konga.com/eewoiweod.jpg"
        },
        {
          productName: "Tecno l32",
          quantity: 1,
          price: 50000,
          imageUrl: "https://www.konga.com/eewoiweod.jpg"
        },
        {
          productName: "Infinix s5",
          quantity: 1,
          price: 10500,
          imageUrl: "https://www.konga.com/eewoiweod.jpg"
        }
      ],
      uniqueIdentifier: v4(),
      onlineStores: [
        {
          onlineStoreName: "Konga",
          productUrl: "https://task.compound.ng"
        }
      ]
    }

    try {
      const response = await axios.post(`${apiEndpoint}/order/checkout`, obj)

      //   console.log(response)

      if (response.data.status === "success") {
        console.log(response)
        localStorage.setItem("orderId", response.data["order id"])
        history.push(`/${response.data["order id"]}/status`)
      }
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <div className="vh-100 bg-light d-flex flex-column align-items-center justify-content-center">
      <div className="w-25 bg-white">
        <Row className="">
          <Col md={12}>
            <Row className="cart-card mb-5">
              <Col className="m-4">
                <div className="cart-item">
                  {products.map((product, i) => (
                    <Row key={i} className="item-row">
                      <Col>
                        <div className="image">
                          <Image
                            style={{
                              border: "1px solid #DCDCDC",
                              padding: "0px",
                              height: "80px",
                              borderRadius: "5px"
                            }}
                            fluid
                            src={product.imageUrl}
                          />
                        </div>
                      </Col>
                      <Col className=" text-muted item-text my-auto">
                        <span className="lh-1">{product.productName}</span>
                        <span className="lh-1">
                          ₦ {Number(product.price).toLocaleString()}
                        </span>
                        <span className="lh-1">Qty: {product.quantity}</span>
                      </Col>
                    </Row>
                  ))}
                </div>
                <br />
                <br />
                <hr />

                <Row className="mt-3 total">
                  <Col>
                    <span className="text-muted">Total Cart Value:</span>
                  </Col>
                  <Col>
                    <span className="price">
                      <strong>₦ 80,500</strong>
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Button
        className="px-5 py-2 mt-5 rounded d-block mb-auto"
        variant="outline-secondary"
        id="wallet-button-id"
        onClick={checkoutHandler}
      >
        Proceed
      </Button>
    </div>
  )
}

export default Checkout

const products = [
  {
    productName: "Samsung A51",
    quantity: 1,
    price: 20000,
    imageUrl: "https://www.konga.com/eewoiweod.jpg"
  },
  {
    productName: "Tecno l32",
    quantity: 1,
    price: 50000,
    imageUrl: "https://www.konga.com/eewoiweod.jpg"
  },
  {
    productName: "Infinix s5",
    quantity: 1,
    price: 10500,
    imageUrl: "https://www.konga.com/eewoiweod.jpg"
  }
]
