// src/components/BookCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  const { id, volumeInfo } = book;
  const { title, authors, imageLinks } = volumeInfo;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        sx={{ height: 200, objectFit: 'contain' }}
        image={imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Cover'}
        alt={title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {authors ? authors.join(', ') : 'Unknown Author'}
        </Typography>
      </CardContent>
      <Button component={Link} to={`/book/${id}`} variant="outlined" sx={{ m: 2 }}>
        View Details
      </Button>
    </Card>
  );
};

export default BookCard;