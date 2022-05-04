import {
  List, ListItem, ListItemText, Paper,
} from '@mui/material';
import { ReactElement, ReactNode } from 'react';

interface Props {
    title: string | ReactNode;
    children?: ReactElement | ReactElement[],
}

export const ListItemContainer = ({ title, children }: Props) => (
  <Paper>
    <List>
      <ListItem>
        <ListItemText primary={title} />
        {children}
      </ListItem>
    </List>
  </Paper>
);
