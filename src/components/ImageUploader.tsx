import React, { useState, ChangeEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useImageStore from '../store/useImageStore';
import axios from 'axios';
import { Box, Button, TextField, CircularProgress } from '@mui/material';

interface ImageResponse {
    id: string;
    name: string;
    url: string;
}

const uploadImage = async (file: File): Promise<ImageResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await axios.post('/upload', formData);
    return data;
};

const ImageUploader: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const addImage = useImageStore((state) => state.addImage);
    const queryClient = useQueryClient();

    const mutation = useMutation(uploadImage, {
        onSuccess: (data) => {
            addImage(data);
            queryClient.invalidateQueries(['images']);
        },
    });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        setFile(selectedFile);
    };

    const handleUpload = () => {
        if (file) {
            mutation.mutate(file);
        }
    };

    return (
        <Box className="p-4 flex flex-col items-center">
            <TextField
                type="file"
                onChange={handleFileChange}
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                onClick={handleUpload}
                disabled={!file || mutation.isLoading}
            >
                {mutation.isLoading ? <CircularProgress size={24} /> : 'Upload'}
            </Button>
        </Box>
    );
};

export default ImageUploader;
