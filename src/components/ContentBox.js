import React, { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Spinner,
    Card,
    CardHeader,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
} from "reactstrap";
import axios from "axios";
import NavbarSearch from "./NavbarSearch";

function ContentBox(props) {
    const [data, setData] = useState(null);
    useEffect(() => {
        let promises = [];

        for (let i = 1; i <= 151; i++) {
            promises.push(axios.get("https://pokeapi.co/api/v2/pokemon/" + i));
        }

        Promise.all(promises).then(function (responses) {
            setData(responses);
        });
    }, []);

    const [pokemon, setPokemon] = useState(null);
    const handleSubmit = async (spokemon) => {
        if (spokemon) {
            await axios
                .get("https://pokeapi.co/api/v2/pokemon/" + spokemon)
                .then(function (response) {
                    setPokemon(response.data);
                });
        }
    };

    return (
        <>
            <NavbarSearch onHandleSubmit={handleSubmit} />
            {pokemon && (
                <Container>
                    <Row className="mt-3 d-fex justify-content-center">
                        <Col
                            xs="12"
                            sm="6"
                            md="4"
                            className="mb-2"
                            key={pokemon.id}
                        >
                            <Card className="rounded shadow">
                                <CardHeader>
                                    <CardImg
                                        top
                                        width="100%"
                                        src={pokemon.sprites.front_default}
                                    />
                                </CardHeader>
                                <CardBody>
                                    <CardTitle
                                        className="text-center text-capitalize"
                                        tag="h5"
                                    >
                                        {" "}
                                        {pokemon.name}
                                    </CardTitle>
                                    <CardText>
                                        <strong>ID Pokedex:</strong>{" "}
                                        {pokemon.id} <br />
                                        <strong>Type:</strong>{" "}
                                        {pokemon.types[0].type.name} <br />
                                        <strong>Weight:</strong>{" "}
                                        {pokemon.weight / 10}Kg <br />
                                        <strong>Height:</strong>{" "}
                                        {pokemon.height / 10}M
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )}

            {data && !pokemon && (
                <Container>
                    <Row className="mt-3">
                        {data.map((data) => (
                            <Col
                                xs="12"
                                sm="6"
                                md="3"
                                className="mb-2"
                                key={data.data.id}
                            >
                                <Card className="rounded shadow">
                                    <CardHeader>
                                        <CardImg
                                            top
                                            width="100%"
                                            src={
                                                data.data.sprites.front_default
                                            }
                                        />
                                    </CardHeader>
                                    <CardBody>
                                        <CardTitle
                                            className="text-center text-capitalize"
                                            tag="h5"
                                        >
                                            {" "}
                                            {data.data.name}
                                        </CardTitle>
                                        <CardText>
                                            <strong>ID Pokedex:</strong>{" "}
                                            {data.data.id} <br />
                                            <strong>Type:</strong>{" "}
                                            {data.data.types[0].type.name}{" "}
                                            <br />
                                            <strong>Weight:</strong>{" "}
                                            {data.data.weight / 10}Kg <br />
                                            <strong>Height:</strong>{" "}
                                            {data.data.height / 10}M
                                        </CardText>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            )}

            {!data && (
                <div className="text-center mt-5">
                    <Spinner color="primary" />
                    <h1 className="text-danger">Pokedex Initializing...</h1>
                </div>
            )}
        </>
    );
}

export default ContentBox;
