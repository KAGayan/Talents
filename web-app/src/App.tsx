import { ReactElement } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './styles/index.scss';

const App = (): ReactElement => (
  <Container>
    <Row>
      <Col>Talents</Col>
    </Row>
  </Container>
);

export default App;
