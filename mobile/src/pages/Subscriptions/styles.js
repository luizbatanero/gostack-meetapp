import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background: #e6e7fc;
  flex: 1;
  padding-top: 30px;
`;

export const Empty = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

export const EmptyText = styled.Text`
  font-size: 14px;
  color: #555;
  margin-top: 15px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;
