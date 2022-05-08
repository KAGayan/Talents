import {
  Chip,
  Divider, Stack, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { ListItemContainer, Loader, PageContainer } from 'components/molecule';
import { useActions, useMappedState } from 'hooks';
import { useEffect } from 'react';
import { Experience } from './Experience';
import { Qualifications } from './Qualifications';
import { Skills } from '../Skills';

export const ApplicantHomePage = () => {
  const { user: { user }, resume: { resume, loading } } = useMappedState((state) => state);
  const { getResume } = useActions();

  useEffect(() => {
    user && !resume && getResume();
  }, []);

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
          {`${user?.firstName} ${user?.lastName}`}
        </Typography>
        <Divider />
      </Box>
      {loading
        ? <Loader />
        : (
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
        )}
    </PageContainer>
  );
};
