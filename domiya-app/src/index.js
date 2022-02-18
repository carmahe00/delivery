import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, SafeAreaView } from 'react-native';

import PublicNavigation from './navigation/PublicNavigation';
import AuthNavigation from './navigation/private/AuthNavigation';
import ComponentLoading from './components/utils/ComponentLoading';

export default function Index() {
  const { userInfo, loading } = useSelector(state => state.userReducer)
  const state = useSelector(state => state.userReducer)
  console.log(state)
  
  if(loading)
    return <ComponentLoading />

  return (
    <SafeAreaView style={styles.root}>
      {
        Object.keys(userInfo).length ?
          <AuthNavigation /> :
          <PublicNavigation />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC'
  },
});
