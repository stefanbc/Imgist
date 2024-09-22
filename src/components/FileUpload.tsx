// src/components/FileUpload.tsx
import React, { useState } from 'react';
import { Button, CircularProgress, Snackbar } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useFileStore } from '../store/useImageStore';
import cloudflareR2Service from '../services/cloudflareR2Service';

const FileUpload: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const addFile = useFileStore((state) => state.addFile);

    const mutation = useMutation({
        mutationFn: cloudflareR2Service.uploadFile,
        onSuccess: (data) => {
            addFile(data);
            setSelectedFile(null);
            setSnackbarMessage('File uploaded successfully');
            setOpenSnackbar(true);
        },
        onError: (error) => {
            console.error('Upload failed:', error);
            setSnackbarMessage('File upload failed');
            setOpenSnackbar(true);
        },
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            mutation.mutate(selectedFile);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className="mb-4">
            <input
                type="file"
                onChange={handleFileChange}
                className="mb-2"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={!selectedFile || mutation.isPending}
            >
                {mutation.isPending ? <CircularProgress size={24} /> : 'Upload'}
            </Button>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </div>
    );
};

export default FileUpload;