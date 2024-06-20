import React from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTheme } from '@mui/material/styles';

function ThemeToggle({ toggleTheme }) {
  const theme = useTheme();
  return (
    <FormControlLabel
      control={<Switch checked={theme.palette.mode === 'dark'} onChange={toggleTheme} />}
      label="Dark Mode"
    />
  );
}

export default ThemeToggle;
