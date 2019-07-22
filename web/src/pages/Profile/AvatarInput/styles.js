import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;

  label {
    display: block;
    position: relative;
    cursor: pointer;
    width: 150px;
    height: 150px;

    .overlay {
      position: absolute;
      background: rgba(255, 255, 255, 0.5);
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: 50%;
      opacity: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.3s;

      svg {
        transform: translateY(-50px);
        opacity: 0;
        transition: all 0.3s;
      }
    }

    &:hover .overlay {
      opacity: 1;

      svg {
        transform: none;
        opacity: 1;
      }
    }

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 4px solid #fff;
      box-shadow: 0 2px 8px rgba(93, 97, 164, 0.25);
      background: #eee;
    }

    input {
      display: none;
    }
  }
`;
