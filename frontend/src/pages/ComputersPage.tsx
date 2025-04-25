import React, { useEffect, useState, ChangeEvent, useCallback } from 'react';

import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import {
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Alert,
  Snackbar,
  useTheme
} from '@mui/material';

interface ComputerList {
  ID: number;
  Username: string;
  Department: string;
  License: string;
  Installed: string;
  Brand: string;
  Model: string;
  Serial: string;
}

const ComputersPage: React.FC = () => {
  const theme = useTheme(); 
  const navigate = useNavigate();

  const [computers, setComputers] = useState<ComputerList[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 
  const [file, setFile] = useState<File | null>(null); 
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({ 
    open: false,
    message: ''
  });

  // fetch Data
  const fetchComputers = useCallback(async () => {
    setLoading(true); 
    setError(null); 
    try {
      const { data } = await api.get('/computers'); 
      setComputers(data.data); 
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch computers');
    } finally {
      setLoading(false); 
    }
  }, []);

  useEffect(() => {
    fetchComputers(); 
  }, [fetchComputers]);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null); 
  }, []);

  const handleUpload = useCallback(async () => {
    if (!file) { 
      setSnackbar({ open: true, message: 'Please select a file first' });
      return;
    }

    const formData = new FormData(); 
    formData.append('file', file); 

    try {
      await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' } 
      });

      setSnackbar({ open: true, message: 'Upload successful' }); 
      fetchComputers(); 
      setFile(null); 
      window.location.reload(); 
    } catch (err: any) {
      setSnackbar({ open: true, message: err.response?.data?.error || 'Upload failed' });
    }
  }, [file, fetchComputers]); 

  const clearFile = useCallback(() => {
    setFile(null);
    window.location.reload();
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token'); 
    navigate('/login', { replace: true }); 
  }, [navigate]);

  
  return (
    <Container sx={{ my: 4 }}>
      {/* Header */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ mb: 4 }}
      >
        Computers List
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 3
        }}
      >
        {/* Upload */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <input
              id="file"
              type="file"
              accept=".csv" 
              style={{ display: 'none' }} 
              onChange={handleFileChange}
            />
            <label htmlFor="file"> 
              <Button variant="outlined" component="span">
                Choose File
              </Button>
            </label>
            <Button variant="contained" onClick={handleUpload}>
              Upload
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 1 }}>
            <Typography variant="caption">
              {file?.name || 'No file chosen'}
            </Typography>
            {file && (
              <IconButton size="small" onClick={clearFile}>
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>

        {/* Logout */}
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            bgcolor: theme.palette.error.main,
            color: '#fff',
            '&:hover': { bgcolor: theme.palette.error.dark }
          }}
        >
          Logout
        </Button>
      </Box>

      {/* Content */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TableContainer
            component={Paper}
            sx={{ maxWidth: '100%', boxShadow: theme.shadows[3] }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{ backgroundColor: theme.palette.grey[200] }}
                >
                  {[
                    'No.',
                    'Username',
                    'Department',
                    'License',
                    'Installed',
                    'Brand',
                    'Model',
                    'Serial'
                  ].map((title) => (
                    <TableCell
                      key={title}
                      align="center"
                      sx={{ fontWeight: 'bold'}}
                    >
                      {title}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {computers.map((comp) => (
                  <TableRow
                    key={comp.ID}
                    sx={{
                      '&:nth-of-type(odd)': { //กำหนด theme 
                        backgroundColor: theme.palette.action.hover
                      }
                    }}
                  >
                    <TableCell align="center">{comp.ID}</TableCell>
                    <TableCell align="center">{comp.Username}</TableCell>
                    <TableCell align="center">{comp.Department}</TableCell>
                    <TableCell align="center">{comp.License}</TableCell>
                    <TableCell align="center">{comp.Installed}</TableCell>
                    <TableCell align="center">{comp.Brand}</TableCell>
                    <TableCell align="center">{comp.Model}</TableCell>
                    <TableCell align="center">{comp.Serial}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000} 
        onClose={() => setSnackbar({ open: false, message: '' })}
        message={snackbar.message}
      />
    </Container>
  );
};

export default ComputersPage;
