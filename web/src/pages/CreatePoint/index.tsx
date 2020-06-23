import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';

const CreatePoint = () => {
return (
<div id="page-create-point">
  <header>
    <img src={logo} alt="Ecoleta" />
    <Link to="/">
    <FiArrowLeft></FiArrowLeft>
    Voltar para home
    </Link>
  </header>

  <form>
    <h1>Cadastro do <br /> ponto de coleta</h1>
    <fieldset>
      <legend>
        <h2>Dados</h2>
      </legend>

      <div className="field">
        <label htmlFor="name">Nome da Entidade</label>
        <input type="text" name="name" id="name" />
      </div>

      <div className="field-group">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="field">
          <label htmlFor="whatsapp">Whatsapp</label>
          <input type="text" name="whatsapp" id="whatsapp" />
        </div>
      </div>
    </fieldset>

    <fieldset>
      <legend>
        <h2>Endereço</h2>
        <span>Selecione o endereço no mapa</span>
      </legend>

      <div className="field-group">
        <div className="field">
          <label htmlFor="uf">Estado (UF)</label>
          <select name="uf" id="uf">
            <option value="0">Selecione uma UF</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="city">Cidade</label>
          <select name="city" id="city">
            <option value="0">Selecione uma cidade</option>
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
        <li>
          <img src="http://localhost:3333/uploads/lampadas.svg" alt="Lâmpadas"/>
          <span>Lâmpadas</span>
        </li>
        <li>
          <img src="http://localhost:3333/uploads/lampadas.svg" alt="Lâmpadas"/>
          <span>Lâmpadas</span>
        </li>
        <li>
          <img src="http://localhost:3333/uploads/lampadas.svg" alt="Lâmpadas"/>
          <span>Lâmpadas</span>
        </li>
        <li>
          <img src="http://localhost:3333/uploads/lampadas.svg" alt="Lâmpadas"/>
          <span>Lâmpadas</span>
        </li>
        <li>
          <img src="http://localhost:3333/uploads/lampadas.svg" alt="Lâmpadas"/>
          <span>Lâmpadas</span>
        </li>
        <li>
          <img src="http://localhost:3333/uploads/lampadas.svg" alt="Lâmpadas"/>
          <span>Lâmpadas</span>
        </li>
      </ul>
    </fieldset>

    <button type="submit">Cadastrar ponto de coleta</button>
  </form>
</div>
);
}

export default CreatePoint;