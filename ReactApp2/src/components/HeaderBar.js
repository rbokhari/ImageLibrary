import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, 
    Typography, IconButton
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    grow: {
        flex: 1
    },
    appName: {
        cursor: 'pointer',
    }
}));

export default function HeaderBar() {
    const classes = useStyles();

    return (
        <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Typography className={classes.appName} variant="h6" noWrap >
                Artistic Image Library
            </Typography>
            <div className={classes.grow} />
        </Toolbar>
    );
}
