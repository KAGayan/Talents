import {
  Chip,
  Divider, Stack, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { ListItemContainer, Loader, PageContainer } from 'components/molecule';
import { useActions, useMappedState } from 'hooks';
import { Profiler, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { APPLICANT_PATHS } from 'routes';
import { Experience } from './Experience';
import { Qualifications } from './Qualifications';
import { Skills } from '../Skills';
import { Profile } from './Profile';

export const ApplicantHomePage = () => {
  const { user: { user }, resume: { resume, loading } } = useMappedState((state) => state);
  const { getResume } = useActions();

  useEffect(() => {
    user && !resume && getResume(user.id);
  }, []);

  if (!loading && !resume) return <Navigate to={APPLICANT_PATHS.editResume} />;

  return (
    <PageContainer>
      <Box
        sx={{
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
        >
          {user?.userName}
        </Typography>
        <Divider />
      </Box>
      {loading
        ? <Loader />
        : (
          <Box>
            <Profile profile={resume?.profile} />
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              divider={<Divider orientation="vertical" flexItem />}
              spacing={4}
            >
              <Box
                flex={1}
              >
                <Typography
                  variant="h5"
                  marginBottom={2}
                >
                  {resume?.sector?.title}
                </Typography>
                <Skills skillsList={resume?.skillsList} />
                <Experience experiences={resume?.experiences} />
              </Box>
              <Box
                flex={1}
              >
                <Typography
                  variant="h5"
                  marginBottom={2}
                >
                  Education
                </Typography>
                <Box
                  sx={{
                    mt: 3,
                    mb: 1,
                  }}
                >
                  <ListItemContainer
                    title="Number of GCSE passess"
                  >
                    <Chip label={resume?.gCSEpassess} />
                  </ListItemContainer>
                </Box>
                <Qualifications
                  title="Academic Qualifications"
                  qualifications={resume?.academicQualification}
                />
                <Qualifications
                  title="Professional Qualifications"
                  qualifications={resume?.professionalQualification}
                />
              </Box>
            </Stack>
          </Box>
        )}
    </PageContainer>
  );
};
