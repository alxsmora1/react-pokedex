import React, { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    Button,
    Form,
    Input,
} from "reactstrap";

export default function NavbarSearch({ onHandleSubmit }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [spokemon, setSpokemon] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        onHandleSubmit(spokemon);
    };

    const handleChange = (event) => {
        setSpokemon(event.target.value);
    };

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">React Pokedex</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <Form inline onSubmit={handleSubmit}>
                            <Input
                                type="text"
                                name="pokemon"
                                placeholder="Pokemon"
                                value={spokemon}
                                onChange={handleChange}
                            />
                            <Button className="bg-success ml-2">Search</Button>
                        </Form>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}
