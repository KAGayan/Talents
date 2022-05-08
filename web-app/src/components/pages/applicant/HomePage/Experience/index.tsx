import { Stack, Typography } from '@mui/material';
import { CardItem } from 'components/molecule';
import { Experience as ExperienceType } from 'types';

interface Props {
  experiences?: ExperienceType[];
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
          title={ex.designation.title}
          subheader={`${ex.from} ${ex.to}`}
        >
          <Typography
            variant="body1"
          >
            {ex.description}
          </Typography>
        </CardItem>
      ))}
    </Stack>

  </>
);
