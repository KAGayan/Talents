import { AddCircleOutline, DeleteOutlineRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  CardItem, Loader, PageContainer, YearSelect,
} from 'components/molecule';
import { useActions, useMappedState, useResumeData } from 'hooks';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { APPLICANT_PATHS } from 'routes';
import { Experience, Sector, Skill } from 'types';

export const EditResumePage = () => {
  const { resumeData, setResumeData } = useResumeData();
  const { user: { user }, resume: { resume } } = useMappedState((state) => state);
  const { getResume } = useActions();

  const [sector, setSectorType] = useState<Sector | undefined>();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  const onSectorSelect = async (sect: Sector) => {
    setSectorType(sect);
    setResumeData({ ...resumeData, selectedSector: sector });
  };

  useEffect(() => {
    user && getResume();
  }, []);

  useEffect(() => {
    resume?.sector && setSectorType(resume.sector);
    setResumeData({ ...resumeData, selectedSector: resume?.sector });
  }, [resume]);

  useEffect(() => {
    resume?.skillsList && setSkills(resume.skillsList);
    resume?.experiences && setExperiences(resume.experiences);
  }, [resumeData.sectors]);

  const saveResume = () => console.log({ sector, skills, experiences });

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
            value={sector?.id || ''}
            label="Choose sector"
            disabled={!resumeData.isSectorsLoaded}
          >
            {resumeData?.sectors?.map((sect) => (
              <MenuItem
                key={sect.id}
                value={sect.id}
                onClick={() => onSectorSelect(sect)}
              >
                {sect.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {!resumeData.isOthersLoaded ? <Loader />
          : (
            <>
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
                    currVal?.title && prevVal.push(currVal.title);
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
                  {resumeData?.skills?.map((skill) => (
                    <MenuItem
                      key={skill.id}
                      value={skill.id}
                      onClick={() => {
                        const selectedSkills = skills?.find((s) => s.id === skill.id)
                          ? skills.filter((s) => s.id !== skill.id)
                          : [...skills, skill];
                        setSkills(selectedSkills);
                      }}
                    >
                      <Checkbox checked={!!skills?.find((s) => s.id === skill.id)} />
                      <ListItemText primary={skill.title} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
              >
                <Typography
                  variant="subtitle2"
                >
                  Work Experience
                </Typography>
                <IconButton
                  onClick={() => setExperiences([...experiences, {
                    id: '',
                    designation: {
                      id: '',
                      title: '',
                    },
                    from: '',
                    to: '',
                    description: '',
                  }])}
                >
                  <AddCircleOutline />
                </IconButton>
              </Stack>
              <Stack
                spacing={2}
              >
                {experiences?.map((ex, currI) => (
                  <CardItem
                    key={ex.id}
                    title={(
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                      >
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
                            {resumeData?.designations?.map((des) => (
                              <MenuItem
                                key={des.id}
                                value={des.id}
                                onClick={() => setExperiences(
                                  experiences.map((e, index) => (currI === index
                                    ? { ...e, designation: des } : e)),
                                )}
                              >
                                {des.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <IconButton
                          onClick={
                            () => setExperiences(experiences.filter(
                              (e, i) => (currI !== i),
                            ))
                          }
                        >
                          <DeleteOutlineRounded />
                        </IconButton>
                      </Stack>
              )}
                    subheader={(
                      <Stack
                        direction="row"
                        spacing={2}
                      >
                        <YearSelect
                          lable="From"
                          selectedYear={ex.from}
                          onSelect={(year) => setExperiences(
                            experiences.map((e, index) => (currI === index
                              ? { ...e, from: year } : e)),
                          )}
                        />
                        <YearSelect
                          lable="To"
                          isTo
                          selectedYear={ex.to}
                          onSelect={(year) => setExperiences(
                            experiences.map((e, index) => (currI === index
                              ? { ...e, to: year } : e)),
                          )}
                        />
                      </Stack>
              )}
                  >
                    <TextField
                      id="job-description"
                      label="Description"
                      multiline
                      fullWidth
                      rows={4}
                      value={ex.description}
                      onChange={(e) => setExperiences(
                        experiences.map((expe, index) => (currI === index
                          ? { ...expe, description: e.target.value } : expe)),
                      )}
                    />
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
            </>
          )}
      </Box>
    </PageContainer>
  );
};
