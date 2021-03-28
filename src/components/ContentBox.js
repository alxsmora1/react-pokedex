import React, { useEffect, useState } from 'react';
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
        <div>
        <h1>Data Successfully Loaded</h1>
        {data.map((data) => 
                <div key={data.data.id}>
                <h1>Nombre: {data.data.name}</h1>
                <h5>Peso: {data.data.weight}</h5>
                <h6>ID: {data.data.id}</h6>
                <img src={data.data.sprites.front_default} />
                </div>
        )}
        </div>
    );
}

export default ContentBox;
