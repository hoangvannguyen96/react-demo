import React from 'react';
import { ANIMAL_API, ANIMAL_DETAIL_API } from './Common';
import axios from 'axios'

class AnimalService {
    static getAnimal() {
        return axios.get(ANIMAL_API)
    }
    static createAnimal(newSpecies) {
        return axios.post(ANIMAL_API, newSpecies)
    }
    static getAnimalById(id) {
        return axios.get(ANIMAL_DETAIL_API + id)
    }
}


export default AnimalService;