import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
//import IngredientNameList from '../lists/ingredientNameList'
//import ingredientNameData from '../data/ingredientNameData'

class IngredientApp extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <Container>
          <h1>Ingredients</h1>
          <Row>
            <Col sm><h2>Sandwich</h2></Col>
            <Col sm><h2>Dessert</h2></Col>
            <Col sm><h2>Fruit</h2></Col>
            <Col sm><h2>Vegetable</h2></Col>
            <Col sm><h2>Meat</h2></Col>
            <Col sm><h2>Soup</h2></Col>
          </Row>
          <br />
          <Row>{Array(6).fill(<Col sm><Button variant="primary">Add new</Button></Col>)}</Row>
          <br />
          <Row>
            {Array(6).fill(<Col sm><Table responsive><thead><tr><td>Lemon</td></tr></thead></Table></Col>)}
          </Row>
        </Container>
        {/*ingredientNameComponents*/}
      </div>
    )
  }
}

export default IngredientApp