import { roboto } from './index'
import { createTheme } from '@mui/material'
import { blueGrey, cyan, pink } from '@mui/material/colors'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    // background: {
    //   default: blueGrey['800'],
    //   paper: blueGrey['700'],
    // },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
})