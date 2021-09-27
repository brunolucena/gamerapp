import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';

// Tipo do dispatch caso precise ser usado
// import {Dispatch} from 'redux';

import {Action, GamerAppReduxStore} from '../../Models/Redux';
import {InjectedNavigation} from '../../Models/Utils';
import {listRepos, State} from 'src/Store/Ducks/testRepos';

import CustomActivityIndicator from '../../Components/CustomActivityIndicator';

// export interface OwnProps extends InjectedNavigation, State {}

// interface StateFromProps extends State {}

// interface DispatchFromProps {
//   listRepos: (user: string) => Action;
// }

// type Props = StateFromProps & DispatchFromProps & OwnProps;
type Props = InjectedNavigation;

function TestRepos(props: Props) {
  const dispatch = useDispatch();
  const testRepos = useSelector((state: GamerAppReduxStore) => state.testRepos);

  const {error, loading, repos} = testRepos;

  useEffect(() => {
    dispatch(listRepos('Bruno'));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {!!error && <Text>{error}</Text>}

      <ScrollView>
        {repos &&
          repos.map((t, i) => {
            return <Text key={`${t.title}-${i}`}>{t.title}</Text>;
          })}
      </ScrollView>

      <CustomActivityIndicator isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// function mapStateToProps(
//   state: GamerAppReduxStore,
//   ownProps: OwnProps,
// ): StateFromProps {
//   let storedRepositories = state.testRepos.repos.map((repo: any) => ({
//     key: repo.id,
//     ...repo,
//   }));

//   return {
//     ...state.testRepos,
//     repos: storedRepositories,
//   };
// }

// const mapDispatchToProps: DispatchFromProps = {
//   listRepos,
// };

// Exemplo de Types do mapDispatchToProps como função
// function mapDispatchToProps(
//   dispatch: Dispatch,
//   ownProps: OwnProps,
// ): DispatchFromProps {
//   return {
//     listRepos: (user: string) => dispatch(listRepos(user)),
//   };
// }

// export default connect<
//   StateFromProps,
//   DispatchFromProps,
//   OwnProps,
//   GamerAppReduxStore
// >(
//   mapStateToProps,
//   mapDispatchToProps,
// )(TestRepos);

export default TestRepos;
