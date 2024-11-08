// src/pages/Search.js
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Box,Container, TextField, Button, Grid2, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import BookCard from '../components/BookCard';

const fetchBooks = async (query) => {
  const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  return response.data.items || [];
};

const Search = () => {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: books, isLoading, error } = useQuery(['books', searchTerm], () => fetchBooks(searchTerm), {
    enabled: !!searchTerm,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(query);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <form onSubmit={handleSearch}>
        <Grid2 container spacing={2} alignItems="center">
          <Grid2 item xs={12} sm={9}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search for books"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Grid2>
          <Grid2 item xs={12} sm={3}>
            <Button fullWidth variant="contained" color="primary" type="submit" size="large">
              Search
            </Button>
          </Grid2>
        </Grid2>
      </form>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          An error occurred: {error.message}
        </Typography>
      )}

      <Grid2 container spacing={4} sx={{ mt: 4 }}>
        {books &&
          books.map((book, index) => (
            <Grid2 item xs={12} sm={6} md={4} key={book.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BookCard book={book} />
              </motion.div>
            </Grid2>
          ))}
      </Grid2>
    </Container>
  );
};

export default Search;