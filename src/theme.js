import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    },
    MuiCheckbox: {
      root: {
        padding: '1px 9px',
      },
    },
    MuiGrid: {
      container: {
        padding: '8px',
        marginTop: '16px',
        '& label': {
          paddingBottom: '10px',
        },
        '& legend': {
          paddingBottom: '10px',
        },
        '& .conditional': {
          background: '#F0F0F0',
          borderRadius: '5px',
          marginLeft: '10px',
          marginTop: '8px',
          padding: '8px',
          marginRight: '-10px',
        },
      },
    },
    MuiFormControl: {
      root: {
        '& .conditional': {
          background: '#F0F0F0',
          borderRadius: '5px',
          marginLeft: '10px',
          marginTop: '8px',
          padding: '8px',
          marginRight: '-10px',
        },
      },
    },
    NoBottomMargin: {
      '& MuiTypography': {
        paragraph: {
          marginBottom: '0px',
          marginTop: '1em',
        },
      },
    },
  },
});

export default theme;
