import { Button } from '@mui/material';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateUserPfp } from '../store/authSlice';
import { fireBaseAuth } from '../utils';
import { storage } from '../utils/fireBaseConfig';
import ProgressBar from './ProgressBar';

const ImageUpload = () => {
    const [file, setFile] = useState(null)
    const [percent, setPercent] = useState(0)
    const dispatch = useDispatch()

    function handleFileChange(event) {
        const file = event.target.files[0]

        setFile(prev => prev = file)
    }

    const handleUpload = () => {
        if (!file) return
        if (!file.name.match(/\.(jpg|jpeg|png|gif|bmp)$/)) return
        const storageRef = ref(storage, `/userpfps/${Math.random()}${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    dispatch(updateUserPfp(url))
                    fireBaseAuth.updateUserPfp(url)
                })
            }
        );
    };
    return (
        <>
            <input type='file' id='imageFile' name='imageFile' accept='image/*' onChange={handleFileChange} />
            {percent > 0 && <ProgressBar value={percent} />}
            <Button onClick={handleUpload} >Upload Image</Button>
        </>
    )
}

export default ImageUpload