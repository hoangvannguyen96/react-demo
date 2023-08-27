import React, { useEffect, useState } from 'react';
import AnimalService from '../../service/AnimalService'
import { Link } from 'react-router-dom';

function AnimalList() {
    const [animals, setAnimals] = useState([])

    useEffect(() => {
        async function getAllAnimal() {
            let res = await AnimalService.getAnimal();
            setAnimals(res.data)
        }
        getAllAnimal()
    }, [])

    return (
        <div className='container-fluid'>
            <h1 className='row text-center text-primary justify-content-center mb-3 mt-3'>LIST ANIMAL</h1>
            <div className="row animal-grid">
                {
                    animals?.map((animal) => (
                        <div className="col-sm-3 mb-3 animal-card" key={animal.id}>
                            <div className="card">
                                <img className="card-img-top"
                                    src={animal.avatar}
                                    alt="Card image cap"
                                    style={{ width: '100%', height: '300px' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{animal.name}</h5>
                                    <h5 className="card-title">{animal.gender}</h5>
                                    <h5 className="card-title">{animal.species?.name}</h5>
                                    <Link to={`/animal/${animal.id}`} className="btn btn-primary">Detail</Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default AnimalList;