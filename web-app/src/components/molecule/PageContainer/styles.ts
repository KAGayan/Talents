import { makeClasses } from 'config';

export const classes = makeClasses({
  container: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '100vh',
    px: 2,
  },
  childrenWrapper: {
    flex: 1,
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
  },
});
