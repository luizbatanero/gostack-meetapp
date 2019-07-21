import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  box-shadow: 0 0 10px rgba(93, 97, 164, 0.15);
`;

export const Content = styled.div`
  padding: 15px 0;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav img {
    height: 57px;
    width: auto;
  }

  aside {
    a {
      display: flex;
      align-items: center;
      color: #515363;
    }

    img {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      margin-right: 12px;
      border: 2px solid #fff;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.35);
    }
  }
`;
