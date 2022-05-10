import {
  Card, CardContent, CardHeader,
} from '@mui/material';
import { ReactElement, ReactNode } from 'react';

interface Props {
    title: string | ReactNode;
    subheader?: string | number | ReactElement;
    children?: ReactNode;
}

export const CardItem = ({ title, subheader, children }: Props) => (
  <Card>
    <CardHeader
      title={title}
      subheader={subheader}
    />
    <CardContent>
      {children}
    </CardContent>
  </Card>
);
