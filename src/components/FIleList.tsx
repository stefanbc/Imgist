import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    CircularProgress,
    Typography,
    Paper,
    Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import { useQuery } from '@tanstack/react-query';
import cloudflareR2Service from '../services/cloudflareR2Service';

const FileList: React.FC = () => {
    const { data: files, isLoading, isError } = useQuery({
        queryKey: ['files'],
        queryFn: cloudflareR2Service.listFiles,
    });

    const handleDownload = (fileName: string) => {
        // Implement download logic here
        console.log(`Downloading ${fileName}`);
    };

    const handleDelete = (fileName: string) => {
        // Implement delete logic here
        console.log(`Deleting ${fileName}`);
    };

    if (isLoading) {
        return <CircularProgress />;
    }

    if (isError) {
        return <Typography color="error">Error loading files. Please try again later.</Typography>;
    }

    return (
        <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Uploaded Files</Typography>
            <List>
                {files?.map((file) => (
                    <ListItem key={file.name} divider>
                        <ListItemText
                            primary={file.name}
                            secondary={`Size: ${(file.size / 1024).toFixed(2)} KB | Uploaded: ${new Date(file.uploadedAt).toLocaleString()}`}
                        />
                        <ListItemSecondaryAction>
                            <Tooltip title="Download">
                                <IconButton edge="end" aria-label="download" onClick={() => handleDownload(file.name)} sx={{ mr: 1 }}>
                                    <GetAppIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(file.name)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            {files?.length === 0 && (
                <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
                    No files uploaded yet.
                </Typography>
            )}
        </Paper>
    );
};

export default FileList;