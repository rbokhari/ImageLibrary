import React, { useState } from 'react';

import ImageApi from 'api/image';
import { Typography, Button } from '@material-ui/core';

export default function ImageUpload() {

    const [file, setFile] = useState(null);

    const handleFileChange = e => setFile(e.target.files[0]);

    const handleFileUpload = e => {
        const formData = new FormData();
        formData.append('file', file);
        ImageApi.upload(formData)
            .then(s => {
                setFile('');
            }, e => {
                console.error('e', e);
            });
    }

    return (
        <div>
            <Typography variant="h6">
                Image Upload
            </Typography>
            <input type="file" onChange={handleFileChange} />
            
            <Button variant="contained" color="primary" onClick={handleFileUpload} >Send File</Button>
            {/* <Typography variant="h6">
                File Upload Successfully !
            </Typography> */}

        </div>
    );
}