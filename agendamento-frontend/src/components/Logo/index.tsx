import React, { CSSProperties } from 'react';

import LogoImage from '../../assets/img/logo.png';

import { Container } from './styles';

interface Props {
  style?: CSSProperties;
}

const Logo: React.FC<Props> = ({ style }) => {
  return (
    <Container style={style} src={LogoImage} alt="Logo E-Filas" />
  );
}

export default Logo;