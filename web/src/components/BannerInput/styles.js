import styled from 'styled-components';

export const Container = styled.div`
  align-self: stretch;
  margin-bottom: 5px;

  label {
    display: block;
    position: relative;
    cursor: pointer;
    width: 100%;
    height: 0;
    padding-top: 37.778%;
    background: rgba(0, 0, 0, 0.05);
    transition: background 0.3s;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 10px;

    &:hover {
      background: rgba(0, 0, 0, 0.085);

      .overlay {
        opacity: 1;

        svg {
          transform: none;
          opacity: 1;
        }
      }
    }

    .icon-add {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .overlay {
      position: absolute;
      background: rgba(255, 255, 255, 0.5);
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.3s;
      z-index: 2;

      svg {
        transform: translateY(-50px);
        opacity: 0;
        transition: all 0.3s;
      }
    }

    img {
      display: block;
      max-width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
    }

    input {
      display: none;
    }
  }
`;
