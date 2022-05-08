import {
  Box, Chip, Grid, IconButton, Typography,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ListItemContainer } from 'components/molecule';
import { Skill } from 'types';

interface Props {
  skillsList?: Skill[];
  onAdd?: () => void;
  onDelete?: (id: string) => void;
}

export const Skills = ({ skillsList, onAdd, onDelete }: Props) => (
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
        <Box
          display="flex"
          flexDirection="row"
        >
          <Grid
            container
            spacing={2}
          >
            {skillsList?.map((skill) => (
              <Grid
                key={skill.id}
                item
              >
                <Chip
                  label={skill.title}
                  onDelete={onDelete ? () => {
                    onDelete(skill.id);
                  } : undefined}
                />
              </Grid>
            ))}
          </Grid>
          {onAdd && (
          <IconButton
            onClick={onAdd}
          >
            <AddCircleOutlineIcon />
          </IconButton>
          )}
        </Box>
        )}
    />
  </Box>
);
