import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';

const CreatePoint = () => {
  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta"/>
        <Link to="/">
          <FiArrowLeft></FiArrowLeft>
          Voltar para home
        </Link>
      </header>
    </div>
  );
}

export default CreatePoint;