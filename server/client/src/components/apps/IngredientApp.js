import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Button from 'react-bootstrap/Button'
import IngredientNameList from '../lists/ingredientNameList'
import ingredientNameData from '../data/ingredientNameData'

class IngredientApp extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <h1>hello</h1>
                <Container>
                    <Row>
                        <Col><h2>Sandwich</h2></Col>
                    </Row>
                    <Row>
                        <Col><h2>Dessert</h2></Col>
                    </Row>
                    <Row>
                        <Col><h2>Fruit</h2></Col>
                    </Row>
                    <Row>
                        <Col><h2>Vegetable</h2></Col>
                    </Row>
                    <Row>
                        <Col><h2>Meat</h2></Col>
                    </Row>
                    <Row>
                        <Col><h2>Soup</h2></Col>
                    </Row>
                </Container>
                {/*ingredientNameComponents*/}
            </div>
        )
    }
}

export default IngredientApp