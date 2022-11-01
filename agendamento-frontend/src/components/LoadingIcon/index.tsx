import React from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

const LoadingIcon: React.FC<IconBaseProps> = (props) => {
  return <Container {...props}/>;
}

export default LoadingIcon;