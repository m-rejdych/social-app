import countryList from 'react-select-country-list';
import Country from '../types/Country';

const countries: Country[] = countryList().getData();

export default countries;
