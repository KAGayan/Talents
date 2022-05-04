import {
  Card, CardContent, CardHeader, Typography,
} from '@mui/material';
import { ReactElement } from 'react';

interface Props {
    title: string;
    subheader?: string | number | ReactElement;
    description?: string;
}

export const CardItem = ({ title, subheader, description }: Props) => (
  <Card>
    <CardHeader
      title={title}
      subheader={subheader}
    />
    <CardContent>
      <Typography
        variant="body1"
      >
        {description}
      </Typography>
    </CardContent>
  </Card>
);
