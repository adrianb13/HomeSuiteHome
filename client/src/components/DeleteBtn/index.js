import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function IconButtons(props) {
  const { classes } = props;
  return (
    <div>
      <IconButton className={classes.button} aria-label="Delete">
        <DeleteIcon />
        </IconButton>
    </div>
  );
}

DeleteBtn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeleteBtn
  );
