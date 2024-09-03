import React, { useState, useEffect } from 'react';
import { CityService } from '../Services/CityService';
import { CountryService } from '../Services/CountryService';
import { City } from '../models/City';
import { Country } from '../models/Country';

const CityList: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [newCity, setNewCity] = useState<City | null>(null);
  const [newCountry, setNewCountry] = useState<Country | null>(null);
  const [editingCity, setEditingCity] = useState<City | null>(null);

  useEffect(() => {
    loadCities();
    loadCountries();
  }, []);

  const loadCities = async () => {
    const response = await CityService.getCities();
    setCities(response.data.data);
  };

  const loadCountries = async () => {
    const response = await CountryService.getCountries();
    setCountries(response.data.data);
  };

  const addCity = () => {
    setNewCity({ id: 0, name: '', lat: 0, lon: 0, countryId: 0, country: { id: 0, name: '', iso2: '', iso3: '', totCities: 0 } });
  };

  const saveCity = async () => {
    if (newCity) {
      if (newCity.countryId === 0 && newCountry) {
        const countryResponse = await CountryService.postCountry(newCountry);
        newCity.countryId = countryResponse.data.id;
        newCity.country = countryResponse.data;
      }
      console.log(newCity)
      await CityService.postCity(newCity);
      loadCities();
      setNewCity(null);
    }
  };

  const editCity = (city: City) => {
    setEditingCity(city);
  };

  const saveEditCity = async () => {
    if (editingCity) {
      await CityService.updateCity(editingCity.id, editingCity);
      loadCities();
      setEditingCity(null);
    }
  };

  const deleteCity = async (city: City) => {
    await CityService.deleteCity(city.id);
    loadCities();
  };

  return (
    <div className="container">
      <h2>City List</h2>
      <button className="btn btn-primary mb-3" onClick={addCity}>Add City</button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cities.map(city => (
            <tr key={city.id}>
              <td>{city.id}</td>
              <td>{city.name}</td>
              <td>{city.lat}</td>
              <td>{city.lon}</td>
              {/* <td>{city.country.name}</td> */}
              <td>{city.country && city.country.name}</td> 
              <td>
                <button className="btn btn-info mr-2" onClick={() => editCity(city)}>Edit</button>
                <button className="btn btn-danger" onClick={() => deleteCity(city)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        
      </table>

      {newCity && (
        <div>
          <h3>Create</h3>
          <form onSubmit={saveCity}>
            <div className="form-group">
              <label>Country:</label>
              <select value={newCity.countryId} onChange={e => setNewCity({ ...newCity, countryId: Number(e.target.value) })}>
                <option value={0}>Select Country</option>
                {countries.map(country => (
                  <option key={country.id} value={country.id}>{country.name}</option>
                ))}
              </select>
            </div> 
            {newCity.countryId === 0 && (
              <div>
                <h4>Create New Country</h4>
                <label>Country Name</label>
                <input type="text" placeholder="Name" onChange={e => setNewCountry({ ...newCountry, name: e.target.value } as Country)} />
                <label>ISO2</label>
                <input type="text" placeholder="ISO2" onChange={e => setNewCountry({ ...newCountry, iso2: e.target.value } as Country)} />
                <label>ISO3</label>
                <input type="text" placeholder="ISO3" onChange={e => setNewCountry({ ...newCountry, iso3: e.target.value } as Country)} />
              </div>
            )}
            <input type="text" placeholder="Name" onChange={e => setNewCity({ ...newCity, name: e.target.value })} />
            <input type="number" placeholder="Latitude" onChange={e => setNewCity({ ...newCity, lat: Number(e.target.value) })} />
            <input type="number" placeholder="Longitude" onChange={e => setNewCity({ ...newCity, lon: Number(e.target.value) })} />
            <button type="submit">Save</button>
          </form>
        </div>
      )}

      {editingCity && (
        <div>
          <h3>Edit City</h3>
          <form onSubmit={saveEditCity}>
            <input type="text" value={editingCity.name} onChange={e => setEditingCity({ ...editingCity, name: e.target.value })} />
            <input type="number" value={editingCity.lat} onChange={e => setEditingCity({ ...editingCity, lat: Number(e.target.value) })} />
            <input type="number" value={editingCity.lon} onChange={e => setEditingCity({ ...editingCity, lon: Number(e.target.value) })} />
            <select value={editingCity.countryId} onChange={e => setEditingCity({ ...editingCity, countryId: Number(e.target.value) })}>
              {countries.map(country => (
                <option key={country.id} value={country.id}>{country.name}</option>
              ))}
            </select>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditingCity(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CityList;
