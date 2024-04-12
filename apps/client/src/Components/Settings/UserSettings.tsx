import {Button, Col, Container, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import './Style/usersettings.css'
import {Link} from "react-router-dom";
function UserSettings() {
    return (
        <>
            <Container fluid className={'main-container'}>
                <Row>
                    <Col sm={3} className="bg-secondary sidebar">
                        <div className="sidebar-sticky">
                            <h5>Sidebar</h5>
                            <ListGroup className="nav flex-column">
                                <ListGroupItem className="nav-item bg-secondary border-0">
                                    <Link to={'settings/user'}></Link>
                                </ListGroupItem>
                                <ListGroupItem className="nav-item bg-secondary border-0">
                                    <a className="nav-link" href="#">Link 2</a>
                                </ListGroupItem>
                                <ListGroupItem className="nav-item bg-secondary border-0">
                                    <a className="nav-link" href="#">Link 3</a>
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>
                    <Col sm={9} className={'main-content'}>
                        <Container>
                            <Row>
                                <Col>
                                    <h2>Main Content</h2>
                                    <p>This is the main content area.</p>
                                    <Button variant="primary">Primary Button</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default UserSettings