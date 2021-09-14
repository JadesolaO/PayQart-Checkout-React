import React from "react"
import { Col, Row, Image } from "react-bootstrap"

import { useAppContext } from "../utils/contexts/AppContext"

const CartItem = () => {
  const { products } = useAppContext()

  let totalPrice

  if (products.length > 0) {
    totalPrice = products.reduce((a, c) => a + c.quantity * c.price, 0)
  }

  return (
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
                  <strong>₦{Number(totalPrice).toLocaleString()}</strong>
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default CartItem
