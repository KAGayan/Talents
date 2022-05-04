import { Stack, Typography } from '@mui/material';
import { ListItemContainer } from 'components/molecule';
import { Qualification } from 'types';

interface Props {
    title: string;
    qualifications?: Qualification[]
}

export const Qualifications = ({ title, qualifications }: Props) => (
  <>
    <Typography
      variant="subtitle2"
      sx={{
        mt: 3,
        mb: 1,
      }}
    >
      {title}
    </Typography>
    <Stack
      spacing={2}
    >
      {qualifications?.map((aq) => (
        <ListItemContainer
          key={aq.id}
          title={aq.title}
        />
      ))}
    </Stack>

  </>
);
