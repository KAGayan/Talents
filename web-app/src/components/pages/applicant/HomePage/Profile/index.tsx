import { Stack, Typography } from '@mui/material';
import { CardItem } from 'components/molecule';
import { Profile as P } from 'types';

interface Props {
  profile?: P;
}

export const Profile = ({ profile }: Props) => (
  <Stack
    spacing={2}
    marginBottom={4}
  >
    <CardItem
      title={`${profile?.firstname} ${profile?.lastName}`}
      subheader={`${profile?.contactNumber}`}
    >
      <Typography
        variant="body1"
      >
        {profile?.address}
      </Typography>
    </CardItem>
  </Stack>
);
