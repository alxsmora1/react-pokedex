import React, { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Card, 
    CardHeader, 
    CardImg, 
    CardText, 
    CardBody,
    CardTitle
} from 'reactstrap';
import axios from 'axios';

function ContentBox() {
    const [data, setData] = useState(null);
    useEffect(() => {
            let promises = [];
            
            for (let i = 1; i <= 50; i++) {
               promises.push(axios.get('https://pokeapi.co/api/v2/pokemon/' + i)); 
            }

            Promise.all(promises).then(function (responses) {
                setData(responses);
                console.log(responses);
            });
    }, []);

    if (!data) {
        return <h1>Loading...</h1>;
    }
    
    return (
        <Container>
        <Row className="mt-3">
        {data.map((data) => 
            <Col xs="12" sm="6" md="3 mb-2">
                <Card className="rounded shadow" key={data.data.id}>
                <CardHeader>
                    <CardImg top width="100%" src={data.data.sprites.front_default} />
                </CardHeader>
                <CardBody>
                    <CardTitle className="text-center text-capitalize" tag="h5"> {data.data.name}</CardTitle>
                    <CardText>
                        <strong>ID Pokedex:</strong> {data.data.id} <br />
                        <strong>Type:</strong> {data.data.types[0].type.name} <br />
                        <strong>Weight:</strong> {data.data.weight/10}Kg <br /> 
                        <strong>Height:</strong> {data.data.height/10}M
                    </CardText>
                </CardBody>      
                </Card>
            </Col>
        )}
        </Row>
        </Container>
    );
}

export default ContentBox;
