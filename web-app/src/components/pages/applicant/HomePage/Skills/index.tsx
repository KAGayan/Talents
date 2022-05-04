import {
  Box, Chip, Grid, Typography,
} from '@mui/material';
import { ListItemContainer } from 'components/molecule';
import { SkillsList } from 'types';

interface Props {
  skillsList?: SkillsList[];
}

export const Skills = ({ skillsList }: Props) => (
  <Box
    sx={{
      mb: 3,
    }}
  >
    <Typography
      variant="subtitle2"
    >
      Skills
    </Typography>
    <ListItemContainer
      title={(
        <Grid
          container
          spacing={2}
        >
          {skillsList?.map((skil) => (
            <Grid
              key={skil.id}
              item
            >
              <Chip label={skil.title} />
            </Grid>
          ))}
        </Grid>
            )}
    />
  </Box>
);
