import styled from 'styled-components';
import { darken } from 'polished';

export const Button = styled.button`
  margin: 25px 0 0;
  height: 44px;
  background: #445ae3;
  font-weight: bold;
  letter-spacing: 0.5px;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;

  cursor: ${props => (props.disabled ? 'wait' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.6 : 1)};

  &:hover {
    background: ${darken(0.045, '#445AE3')};
  }
`;
