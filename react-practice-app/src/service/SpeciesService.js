import { SPECIES_API } from './Common';
import axios from 'axios'

class SpeciesService {
    static getSpecies() {
        return axios.get(SPECIES_API)
    }
}


export default SpeciesService;