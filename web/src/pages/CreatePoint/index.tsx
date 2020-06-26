import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react';
import './styles.css';
import {Link} from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import {Map, TileLayer, Marker} from 'react-leaflet';
import axios from 'axios';
import api from '../../services/api';
import { LeafletMouseEvent } from 'leaflet';

// Sempre que for criado um estado para um array ou objeto, deve ser setado manualmente o tipo da variável.

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface IBGEUFResponse {
  sigla: string;
}

interface IBGEUFResponseCidade {
  nome: string;
}

const CreatePoint = () => {
  const [items, setItems] = useState<Array<Item>>([]);
  const [ufs, setUfs] = useState<Array<string>>([]);
  const [cities, setCitie] = useState<Array<string>>([]);
  const [selectedUF, setSelectedUF] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  });
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    })
  },[]);

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados/').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla);
      setUfs(ufInitials);
    });
  },[]);

  useEffect(() => {
    if(selectedUF === '0'){return}
    // Carregar as cidades sempre que a UF mudar
    axios
      .get<IBGEUFResponseCidade[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
      .then(response => {
        const ufNome = response.data.map(uf => uf.nome);
        setCitie(ufNome);
      });
  },[selectedUF]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const {
        latitude, longitude
      } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  }, []);

  function handleSelectUF(event: ChangeEvent<HTMLSelectElement>){
    const ufSelected = event.target.value;
    setSelectedUF(ufSelected);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>){
    const city = event.target.value;
    setSelectedCity(city);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng
    ]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>){
    const {name, value} = event.target;
    setFormData({...formData, [name]:value});
  }

  function handleSelectItem(id: number){
    const alreadySelected = selectedItems.findIndex(item => item === id);
    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filteredItems);
    }else {
      setSelectedItems([...selectedItems, id]);
    }
    
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();
    const { name, email, whatsapp} = formData;
    const uf = selectedUF;
    const city = selectedCity;
    const[latitude, longitude] = selectedPosition;
    const items= selectedItems;
    const data = {
      name, 
      email,
      whatsapp,
      uf,
      city,
      latitude,
      longitude,
      items
    };
    await api.post('points', data);
  }



  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />
        <Link to="/">
        <FiArrowLeft></FiArrowLeft>
        Voltar para home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro do <br /> ponto de coleta</h1>
        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da Entidade</label>
            <input type="text" name="name" id="name" onChange={handleInputChange}/>
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" onChange={handleInputChange}/>
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange}/>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={initialPosition} zoom={15} onclick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            >
            </TileLayer>

            <Marker position={selectedPosition}></Marker>
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select 
                name="uf" 
                id="uf" 
                value={selectedUF} 
                onChange={handleSelectUF}>
                
                <option value="0">Selecione uma UF</option>
                {ufs.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select 
                name="city" 
                id="city"
                value={selectedCity}
                onChange={handleSelectCity}>

                <option value="0">Selecione uma cidade</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
                
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Itens de Coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <ul className="items-grid">
            {items.map(item => (
              <li className={selectedItems.includes(item.id) ? 'selected' : ''} 
                key={item.id} 
                onClick={() => handleSelectItem(item.id)}>
                <img src={item.image_url} alt={item.title}/>
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
}

export default CreatePoint;