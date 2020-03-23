import React from 'react';
import PropTypes from 'prop-types';
import {WebView} from 'react-native-webview';

import {Browser} from './styles';

export default function Repository({route}) {
  const {repository} = route.params;

  return <WebView source={{uri: repository.html_url}} style={{flex: 1}} />;
}

Repository.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.shape(),
    }),
  }).isRequired,
};
