import React from 'react';

interface HeaderProps {
  title: string; // Utilizar ? se o parâmetro não for obrigatório
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  );
}

export default Header;