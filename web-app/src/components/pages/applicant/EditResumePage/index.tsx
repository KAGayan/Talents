import { AddCircleOutline, DeleteOutlineRounded } from '@mui/icons-material';
import {
  Alert,
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
import { apiService } from 'api';
import {
  CardItem, Loader, PageContainer, YearSelect,
} from 'components/molecule';
import { useMappedState, useResumeData } from 'hooks';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { APPLICANT_PATHS } from 'routes';
import {
  Experience, Profile, Qualification, Sector, Skill,
} from 'types';

export const EditResumePage = () => {
  const navigate = useNavigate();
  const { resumeData, setResumeData } = useResumeData();
  const { user: { user }, resume: { resume } } = useMappedState((state) => state);
  const [message, setMessage] = useState({ error: false, message: '' });
  const [profile, setProfile] = useState<Profile | undefined>();
  const [sector, setSectorType] = useState<Sector | undefined>(resume?.sector);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [gCSEpassess, setGCSEpassess] = useState(0);
  const [academicQualification, setAcademicQualification] = useState<Qualification[]>([]);
  const [professionalQualification, setProfessionalQualification] = useState<Qualification[]>([]);
  const [maximumEducationLevel, setMaximumEducationLevel] = useState<Qualification | null>();

  const onSectorSelect = async (sect: Sector) => {
    setSectorType(sect);
    setResumeData({ ...resumeData, selectedSector: sector });
  };

  useEffect(() => {
    resume?.profile && setProfile(resume.profile);
    resume?.skillsList && setSkills(resume.skillsList);
    resume?.experiences && setExperiences(resume.experiences);
    resume?.gCSEpassess && setGCSEpassess(resume.gCSEpassess);
    resume?.academicQualification && setAcademicQualification(resume.academicQualification);
    resume?.professionalQualification
    && setProfessionalQualification(resume.professionalQualification);
    resume?.maximumEducationLevel
    && setMaximumEducationLevel(resume.maximumEducationLevel);
  }, [resumeData.skills]);

  const saveResume = async () => {
    const updatedResume = {
      profile,
      sector,
      skills,
      experiences,
      gCSEpassess,
      academicQualification,
      professionalQualification,
    };
    if (user?.id) {
      apiService.Resume.save(user.id, updatedResume).then(() => {
        setMessage({ message: 'Successfully updated', error: false });
      }).catch(() => {
        setMessage({ message: 'An error occured', error: true });
      });
    }
  };

  return (
    <PageContainer
      compact
      showBackBtn
    >
      <Typography
        variant="h5"
        marginBottom={4}
      >
        {`${!resume ? 'Create' : 'Edit'} your resume`}
      </Typography>
      {message.message
        ? (
          <Stack
            sx={{ width: '100%' }}
            spacing={2}
          >
            <Alert
              onClose={() => {
                !message.error && navigate(APPLICANT_PATHS.home);
                setMessage({ error: false, message: '' });
              }}
              severity={`${message.error ? 'error' : 'success'}`}
            >
              {message.message}
            </Alert>
          </Stack>
        )
        : (
          <Box
            mt={1}
          >
            <Stack
              spacing={2}
              marginBottom={2}
            >
              <TextField
                fullWidth
                id="firstname"
                label="First Name"
                variant="outlined"
                value={profile?.firstname}
                onChange={(e) => setProfile({ ...profile, firstname: e.target.value })}
              />
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                variant="outlined"
                value={profile?.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
              />
              <TextField
                fullWidth
                id="contactNumber"
                label="Contact Number"
                variant="outlined"
                value={profile?.contactNumber}
                onChange={(e) => setProfile({ ...profile, contactNumber: e.target.value })}
              />
              <TextField
                fullWidth
                id="address"
                label="Address"
                variant="outlined"
                multiline
                maxRows={4}
                value={profile?.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              />
            </Stack>
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
            {resumeData.isSectorsLoaded && !resumeData.isOthersLoaded ? <Loader />
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
                  <FormControl
                    fullWidth
                    sx={{
                      mt: 2,
                      mb: 2,
                    }}
                  >
                    <InputLabel id="gCSEpassess-label">Number of GCSE passess</InputLabel>
                    <Select
                      labelId="gCSEpassess-label"
                      id="gCSEpassess"
                      value={gCSEpassess}
                      label="Number of GCSE passess"
                    >
                      {[0, 1, 2, 3, 4, 5].map((gcse) => (
                        <MenuItem
                          key={gcse}
                          value={gcse}
                          onClick={() => setGCSEpassess(gcse)}
                        >
                          {gcse}
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
                      Academic Qualifications
                    </Typography>
                    <IconButton
                      onClick={() => setAcademicQualification([...academicQualification, {
                        id: 'string',
                        title: 'string',
                        typeId: 'string',
                      }])}
                    >
                      <AddCircleOutline />
                    </IconButton>
                  </Stack>
                  <Stack
                    spacing={2}
                  >
                    <CardItem
                      title={academicQualification?.map((accQual, currI) => (
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
                            <InputLabel id="accQual-label">Choose qualification</InputLabel>
                            <Select
                              labelId="accQual-label"
                              id="accQual"
                              value={accQual.id}
                              label="Choose qualification"
                            >
                              {resumeData?.academicQualification?.map((aq) => (
                                <MenuItem
                                  key={aq.id}
                                  value={aq.id}
                                  onClick={() => {
                                    const selectedQual = [...academicQualification];
                                    selectedQual[currI] = aq;
                                    setAcademicQualification(selectedQual);
                                  }}
                                >
                                  {aq.title}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <IconButton
                            onClick={
                            () => setAcademicQualification(academicQualification.filter(
                              (e, i) => (currI !== i),
                            ))
                          }
                          >
                            <DeleteOutlineRounded />
                          </IconButton>
                        </Stack>
                      ))}
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                  >
                    <Typography
                      variant="subtitle2"
                    >
                      Professional Qualifications
                    </Typography>
                    <IconButton
                      onClick={() => setProfessionalQualification([...professionalQualification, {
                        id: 'string',
                        title: 'string',
                        typeId: 'string',
                      }])}
                    >
                      <AddCircleOutline />
                    </IconButton>
                  </Stack>
                  <Stack
                    spacing={2}
                  >
                    <CardItem
                      title={professionalQualification?.map((proQual, currI) => (
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
                            <InputLabel id="proQual-label">Choose qualification</InputLabel>
                            <Select
                              labelId="proQual-label"
                              id="proQual"
                              value={proQual.id}
                              label="Choose qualification"
                            >
                              {resumeData?.professionalQualification?.map((pq) => (
                                <MenuItem
                                  key={pq.id}
                                  value={pq.id}
                                  onClick={() => {
                                    const selectedQual = [...professionalQualification];
                                    selectedQual[currI] = pq;
                                    setProfessionalQualification(selectedQual);
                                  }}
                                >
                                  {pq.title}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <IconButton
                            onClick={
                            () => setProfessionalQualification(professionalQualification.filter(
                              (e, i) => (currI !== i),
                            ))
                          }
                          >
                            <DeleteOutlineRounded />
                          </IconButton>
                        </Stack>
                      ))}
                    />
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
        )}
    </PageContainer>
  );
};
