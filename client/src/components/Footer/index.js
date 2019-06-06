import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: 500,
  },
};

class Footer extends React.Component {

  render() {
    return (
      "Home Suite Home 2019"
    );
  }
};

export default withStyles(styles)(Footer);
