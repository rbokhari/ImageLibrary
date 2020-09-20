import React from 'react';
// import './App.css';
import { AppBar as MuiAppBar } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { 
  HeaderBar,
  ImageUpload, ImageView
} from 'components';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(10),
  },
}));

function App() {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <CssBaseline />
        <MuiAppBar position="fixed" className={classes.appBar}>
          <HeaderBar />
        </MuiAppBar>
        <main className={classes.content}>
        <ImageUpload />
        <Divider />
        <ImageView />
        </main>
    </div>
  );
}

export default App;
