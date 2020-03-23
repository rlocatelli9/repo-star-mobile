import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  RepositoryButton,
  RepositoryButtonText,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default function User({route, navigation}) {
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const {user} = route.params;

  async function loadData() {
    try {
      setLoading(true);
      const response = await api.get(`/users/${user.login}/starred`);
      const {data} = response;
      setStars(data);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      // ADD THIS THROW error
      throw error;
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function starsMore(numberPage) {
    try {
      const response = await api.get(
        `/users/${user.login}/starred?page=${numberPage}`,
      );
      const {data} = response;
      setStars([...stars, ...data]);
      setPage(numberPage);
    } catch (error) {
      // ADD THIS THROW error
      throw error;
    }
  }

  function loadMore() {
    starsMore(page + 1);
  }

  function refreshList() {
    setRefreshing(true);
    loadData();
  }

  function navigateToRepository(repository) {
    navigation.navigate('Repository', {repository});
  }

  return (
    <Container>
      <Header>
        <Avatar source={{uri: user.avatar}} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>
      {loading ? (
        <ActivityIndicator size={60} color="#ddd" style={{marginTop: 50}} />
      ) : (
        <Stars
          data={stars}
          onRefresh={refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
          refreshing={refreshing} // Variável que armazena um estado true/false que representa se a lista está atualizando
          onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
          onEndReached={loadMore} // Função que carrega mais itens
          keyExtractor={star => String(star.id)}
          renderItem={({item}) => (
            <Starred>
              <OwnerAvatar source={{uri: item.owner.avatar_url}} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
              <RepositoryButton onPress={() => navigateToRepository(item)}>
                <RepositoryButtonText>Visitar</RepositoryButtonText>
              </RepositoryButton>
            </Starred>
          )}
        />
      )}
    </Container>
  );
}

User.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      user: PropTypes.shape(),
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
