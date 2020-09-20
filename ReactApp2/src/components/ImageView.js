import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button, IconButton, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { SERVER_URI } from '../constant';
import ImageApi from 'api/image';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    grow: {
        flex: 1
    },
    grayimage: {
        // tintColor: 'gray',
        filter: 'grayscale(1)'
    }
}));


export default function ImageView() {
    const classes = useStyles();

    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [files, setFiles] = useState(null);
    const serverPath = `${SERVER_URI}/images/attachments/`;

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const result = await ImageApi.getAll();
                setFiles(result.data);
            } catch (err) {
                console.error('Files Error', err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [refresh])

    const handleDelete = async (fileName) => {
        try {
            const result = await ImageApi.delete(fileName);
            console.info('delete handle', result);
            setRefresh(!refresh);
        } catch (err) {
            console.error('Files Error', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Typography variant="h6">
                Image View
            </Typography>
            <Button variant="contained" color="secondary" onClick={() => setRefresh(!refresh)} >Refresh</Button>
            {loading && <div>loading...</div>}
            {!loading && files.length === 0 && <div>No Files exists !</div>}
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {!loading && files && files.map((file, i) => <Grid item sm={3} key={i}>
                        <img heigth="200" width="200" src={`${serverPath}${file}`} alt={file} />
                        <img heigth="200" width="200" className={classes.grayimage} src={`${serverPath}${file}`} alt={file} />
                        <IconButton onClick={() => handleDelete(file)} ><DeleteIcon /></IconButton>
                    </Grid>
                )}
            </Grid>
        </>
    );
}