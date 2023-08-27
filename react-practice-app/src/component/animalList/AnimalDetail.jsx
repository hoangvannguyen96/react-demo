import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AnimalService from '../../service/AnimalService';

function AnimalDetail() {
    const { AnimalId } = useParams();
    const [animals, setAnimals] = useState({})
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function getAnimalDetail() {
            let res = await AnimalService.getAnimalById(AnimalId);
            setAnimals(res.data);
            setLoading(false)
        }
        getAnimalDetail()
    }, [AnimalId])


    return (
        <div className='container'>
            <h1>Animal Detail</h1>
            {
                loading ?
                    (
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )
                    : (
                        <div className="col-sm-3 mb-3 animal-card" key={animals.id}>
                            <div className="card">
                                <img className="card-img-top"
                                    src={animals.avatar}
                                    alt="Card image cap"
                                    style={{ width: '100%', height: '300px' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{animals.name}</h5>
                                    <h5 className="card-title">{animals.gender}</h5>
                                    <h5 className="card-title">{animals.species?.name}</h5>
                                    <Link to={"/animal"} className="btn btn-primary">Come back list animal</Link>
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    );
}

export default AnimalDetail;