import { USA_STATE_AND_CITIES, COUNTIES } from "./constants";

export const getStates = () => {
  let states = Object.keys(USA_STATE_AND_CITIES);
  states = [...new Set(states)];
  states = states.sort();
  return states.map((state) => {
    return {
      label: state,
      value: state,
    };
  });
};

export const getAllCities = () => {
  const states = Object.keys(USA_STATE_AND_CITIES);
  let cities = [];
  states.forEach((state) => {
    cities = [...cities, ...USA_STATE_AND_CITIES[state]];
  });
  cities = [...new Set(cities)];
  cities.sort();
  return cities.map((city) => {
    return {
      label: city,
      value: city,
    };
  });
};

export const getCountries = () => {
  let countries = COUNTIES.map((country) => country.name);
  countries = [...new Set(countries)];
  countries = countries.sort();
  return countries.map((country) => {
    return {
      label: country,
      value: country,
    };
  });
};
