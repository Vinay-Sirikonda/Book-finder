// src/pages/BookDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Container, Typography, Grid2, Paper, Box, CircularProgress } from '@mui/material';

const fetchBookDetails = async (id) => {
  const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
  return response.data;
};

const BookDetails = () => {
  const { id } = useParams();
  const { data: book, isLoading, error } = useQuery(['book', id], () => fetchBookDetails(id));

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        An error occurred: {error.message}
      </Typography>
    );
  }

  const { volumeInfo } = book;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid2 container spacing={4}>
          <Grid2  xs={12} md={4}>
            <img
              src={volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Cover'}
              alt={volumeInfo.title}
              style={{ width: '100%', maxWidth: '300px' }}
            />
          </Grid2>
          <Grid2  xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {volumeInfo.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author'}
            </Typography>
            <Typography variant="body1" >
              {volumeInfo.description || 'No description available.'}
            </Typography>
            <Typography variant="body2">
              <strong>Published Date:</strong> {volumeInfo.publishedDate || 'Unknown'}
            </Typography>
            <Typography variant="body2">
              <strong>Publisher:</strong> {volumeInfo.publisher || 'Unknown'}
            </Typography>
            <Typography variant="body2">
              <strong>ISBN:</strong> {volumeInfo.industryIdentifiers?.[0]?.identifier || 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>Page Count:</strong> {volumeInfo.pageCount || 'Unknown'}
            </Typography>
          </Grid2>
        </Grid2>
      </Paper>
    </Container>
  );
};

export default BookDetails;