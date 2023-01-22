import '@mui/material/styles/createPalette'

declare module '@mui/material/styles' {
  interface CustomPalette {
    twitter: PaletteColorOptions
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    twitter: true
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    twitter: true
  }
}
