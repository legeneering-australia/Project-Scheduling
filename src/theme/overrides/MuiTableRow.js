import palette from '../palette';

export default {
  root: {
    '&$selected': {
      backgroundColor: palette.background.default
    },
    '&$hover': {
      '&:hover': {
        backgroundColor: '#e0e0e0'
      }
    }
  }
};
