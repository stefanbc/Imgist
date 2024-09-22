// src/components/FileList.tsx
import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFileStore } from '../store/useImageStore';

const FileList: React.FC = () => {
    const files = useFileStore((state) => state.files);
    const removeFile = useFileStore((state) => state.removeFile);

    return (
        <List>
            {files.map((file) => (
                <ListItem
                    key={file.id}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => removeFile(file.id)}>
                            <DeleteIcon />
                        </IconButton>
                    }
                >
                    <ListItemText
                        primary={file.name}
                        secondary={`Size: ${file.size} bytes | Uploaded: ${file.uploadedAt.toLocaleString()}`}
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default FileList;