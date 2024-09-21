import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import useImageStore from '../store/useImageStore';

interface Image {
    id: string;
    name: string;
    url: string;
}

const fetchImages = async (): Promise<Image[]> => {
    const { data } = await axios.get('/images');
    return data;
};

const deleteImage = async (id: string): Promise<void> => {
    await axios.delete(`/images/${id}`);
};

const ImageList: React.FC = () => {
    const removeImage = useImageStore((state) => state.removeImage);
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['images'],
        queryFn: fetchImages
    });

    const mutation = useMutation((id: string) => deleteImage(id), {
        onSuccess: (_: unknown, id: string) => {
            removeImage(id);
            queryClient.invalidateQueries(['images']);
        },
        onError: (error: unknown) => {
            console.error("Error deleting image:", error);
        }
    });

    if (isLoading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">Error fetching images. Please try again later.</Typography>;
    }

    return (
        <Grid container spacing={2}>
            {data?.map((image) => (
                <Grid item xs={12} sm={6} md={4} key={image.id}>
                    <Paper elevation={2} className="p-4">
                        <img src={image.url} alt={image.name} className="w-full h-auto" />
                        <Typography variant="body1" className="mt-2">{image.name}</Typography>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => mutation.mutate(image.id)}
                            className="mt-2"
                        >
                            Delete
                        </Button>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

export default ImageList;
