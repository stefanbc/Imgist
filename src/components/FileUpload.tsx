// src/components/FileUpload.tsx
import React, { useState, useRef } from 'react';
import { Button, CircularProgress, Typography, Box, LinearProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import cloudflareR2Service from '../services/cloudflareR2Service';

const FileUpload: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: cloudflareR2Service.uploadFile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['files'] });
            setSelectedFile(null);
            setUploadProgress(0);
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

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Box sx={{ mb: 4, p: 3, border: '1px dashed #ccc', borderRadius: 2, textAlign: 'center' }}>
            <input
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
            />
            <Button
                variant="contained"
                color="primary"
                startIcon={<CloudUploadIcon />}
                onClick={handleButtonClick}
                sx={{ mb: 2 }}
            >
                Select File
            </Button>
            {selectedFile && (
                <Typography variant="body1" sx={{ mb: 2 }}>
                    Selected: {selectedFile.name}
                </Typography>
            )}
            <Button
                variant="contained"
                color="secondary"
                onClick={handleUpload}
                disabled={!selectedFile || mutation.isPending}
                sx={{ mb: 2 }}
            >
                {mutation.isPending ? <CircularProgress size={24} /> : 'Upload'}
            </Button>
            {mutation.isPending && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress variant="determinate" value={uploadProgress} />
                </Box>
            )}
            {mutation.isError && (
                <Typography color="error" sx={{ mt: 2 }}>
                    Upload failed. Please try again.
                </Typography>
            )}
            {mutation.isSuccess && (
                <Typography color="success" sx={{ mt: 2 }}>
                    File uploaded successfully!
                </Typography>
            )}
        </Box>
    );
};

export default FileUpload;