import { Stack, Typography } from '@mui/material';
import { CardItem } from 'components/molecule';
import { Experiences } from 'types';

interface Props {
  experiences?: Experiences[];
}

export const Experience = ({ experiences }: Props) => (
  <>
    <Typography
      variant="subtitle2"
      sx={{
        mb: 1,
      }}
    >
      Work Experience
    </Typography>
    <Stack
      spacing={2}
    >
      {experiences?.map((ex) => (
        <CardItem
          key={ex.id}
          title={ex.title}
          subheader={`${ex.from} ${ex.to}`}
          description={ex.description}
        />
      ))}
    </Stack>

  </>
);
