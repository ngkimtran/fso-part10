import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import SortPicker from './SortPicker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8',
  },
  search: {
    marginHorizontal: 12,
    marginVertical: 20,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({
  order,
  setOrder,
  searchQuery,
  setsearchQuery,
}) => {
  return (
    <>
      <Searchbar
        style={styles.search}
        placeholder='Search...'
        onChangeText={(value) => setsearchQuery(value)}
        value={searchQuery}
      />
      <SortPicker order={order} setOrder={setOrder} />
    </>
  );
};

export class RepositoryListContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  renderHeader = () => {
    const props = this.props;

    return (
      <RepositoryListHeader
        order={props.order}
        setOrder={props.setOrder}
        searchQuery={props.searchQuery}
        setsearchQuery={props.setsearchQuery}
      />
    );
  };

  render() {
    const { navigate, repositories } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigate(`/repositories/${item.id}`, { replace: true })
            }
          >
            <RepositoryItem item={item} />
          </Pressable>
        )}
      />
    );
  }
}

const picker = {
  latest: {
    label: 'Latest repositories',
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  },
  highest: {
    label: 'Highest rated repositories',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
  },
  lowest: {
    label: 'Lowest rated repositories',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  },
};

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const [searchQuery, setsearchQuery] = useState('');
  const [searchKeyword] = useDebounce(searchQuery, 500);
  const navigate = useNavigate();
  const { repositories } = useRepositories({ ...picker[order], searchKeyword });

  return (
    <RepositoryListContainer
      navigate={navigate}
      repositories={repositories}
      order={order}
      setOrder={setOrder}
      searchQuery={searchQuery}
      setsearchQuery={setsearchQuery}
    />
  );
};

export default RepositoryList;
