import styled from 'styled-components/native';

export const Container = styled.SafeAreaView.attrs({
  elevation: 2,
})`
  background: #fff;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

export const Logo = styled.Image`
  width: 44px;
  height: 42.3px;
`;
