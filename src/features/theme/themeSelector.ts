import { PaletteMode } from '@mui/material';
import { RootState } from '../../app/store';

export const selectTheme = (state: RootState): PaletteMode | undefined => state.theme.themeMode