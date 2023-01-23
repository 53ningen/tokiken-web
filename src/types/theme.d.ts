import '@mui/material/styles/createPalette'
import { PaletteColorOptions } from '@mui/material/styles/createPalette'

declare module '@mui/material/styles' {
  interface CustomPalette {
    twitter: PaletteColorOptions
    amazon: PaletteColorOptions
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    twitter: true
    amazon: true
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    twitter: true
    amazon: true
  }
}
