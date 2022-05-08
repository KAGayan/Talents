import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { CardItem, PageContainer } from 'components/molecule';
import { useMappedState } from 'hooks';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { APPLICANT_PATHS } from 'routes';
import { resumeData } from './data';

export const EditResumePage = () => {
  const { resume: { resume } } = useMappedState((state) => state);

  const [sector, setAccountType] = useState(resume?.sector);
  const [skills, setSkills] = useState(resume?.skillsList || []);
  const [experiences, setExperiences] = useState(resume?.experiences || []);

  const saveResume = () => {
    console.log({ sector, skills, experiences });
  };

  if (!resume) return null;

  return (
    <PageContainer
      compact
      showBackBtn
    >
      <Typography
        variant="h5"
        marginBottom={4}
      >
        Edit your resume
      </Typography>
      <Box
        mt={1}
      >
        <FormControl
          fullWidth
          sx={{
            mb: 2,
          }}
        >
          <InputLabel id="sector-label">Choose sector</InputLabel>
          <Select
            labelId="sector-label"
            id="sector"
            value={sector?.id}
            label="Choose sector"
          >
            {resumeData.sectors.map((sect) => (
              <MenuItem
                key={sect.id}
                value={sect.id}
                onClick={() => setAccountType(sect)}
              >
                {sect.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          sx={{
            mb: 2,
          }}
        >
          <InputLabel id="skills-label">skills</InputLabel>
          <Select
            labelId="skills-label"
            id="skills"
            multiple
            value={skills?.reduce((prevVal, currVal) => {
              prevVal.push(currVal.title);
              return prevVal;
            }, [] as string[])}
            input={<OutlinedInput id="select-multiple-skills" label="Skills" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((skil) => (
                  <Chip key={skil} label={skil} />
                ))}
              </Box>
            )}
          >
            {resumeData.skills.map((skill) => (
              <MenuItem
                key={skill.id}
                value={skill.id}
                onClick={() => {
                  const selectedSkills = skills.find((s) => s.id === skill.id)
                    ? skills.filter((s) => s.id !== skill.id)
                    : [...skills, skill];
                  setSkills(selectedSkills);
                }}
              >
                <Checkbox checked={!!skills.find((s) => s.id === skill.id)} />
                <ListItemText primary={skill.title} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography
          variant="subtitle2"
        >
          Work Experience
        </Typography>
        <Stack
          spacing={2}
        >
          {experiences?.map((ex, currI) => (
            <CardItem
              key={ex.id}
              title={(
                <FormControl
                  fullWidth
                  sx={{
                    mb: 2,
                  }}
                >
                  <InputLabel id="designations-label">Choose designation</InputLabel>
                  <Select
                    labelId="designations-label"
                    id="designations"
                    value={ex.designation.id}
                    label="Choose designation"
                  >
                    {resumeData.designations.map((des) => (
                      <MenuItem
                        key={des.id}
                        value={des.id}
                        onClick={() => {
                          setExperiences(
                            experiences.map((e, index) => (currI === index
                              ? { ...e, designation: des } : e)),
                          );
                        }}
                      >
                        {des.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
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
        <Stack
          direction="row"
          spacing={2}
          marginTop={2}
        >
          <Button
            variant="outlined"
            color="error"
            component={Link}
            to={APPLICANT_PATHS.home}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={saveResume}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </PageContainer>
  );
};
