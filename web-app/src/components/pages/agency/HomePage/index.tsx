import { LoadingButton } from '@mui/lab';
import {
  Alert, Card, Stack, Typography,
} from '@mui/material';
import { apiService } from 'api';
import { Loader, PageContainer } from 'components/molecule';
import { useMappedState } from 'hooks';
import { useState } from 'react';
import { Filters, Resume } from 'types';
import { EducationalQualification } from './EducationalQualification';
import { EducationLevel } from './EducationLevel';
import { Experience } from './Experience';
import { GCSEpassess } from './GCSEpassess';
import { ProfessionalQualification } from './ProfessionalQualification';
import { SectorsSelect } from './Sectors';
import { SkillsSelect } from './Skills';

export const AgencyHomePage = () => {
  const { user: { user } } = useMappedState((state) => state);
  const [filters, setfilters] = useState<Filters>();
  const [talents, setTalents] = useState<Resume[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const findTalents = async (by: Filters) => {
    setLoading(true);
    setTalents(undefined);
    setError(undefined);
    try {
      const tals = await apiService.Resume.findTalents(by);
      setTalents(tals);
    } catch (e) {
      setError('No talents found!');
    }
    setLoading(false);
  };

  return (
    <PageContainer>
      <Typography
        variant="h4"
      >
        {user && 'Find Talents'}
      </Typography>
      <Stack
        marginTop={2}
        spacing={2}
        direction="row"
      >
        <SectorsSelect
          selectedId={filters?.sectorId || ''}
          onSelect={(id) => setfilters({ ...filters, sectorId: id })}
        />
        <SkillsSelect
          selectedId={filters?.skillId || ''}
          onSelect={(id) => setfilters({ ...filters, skillId: id })}
          sectorId={filters?.sectorId}
        />
        <Experience
          selectedId={filters?.experienceYears || 0}
          onSelect={(id) => setfilters({ ...filters, experienceYears: id })}
        />
        <GCSEpassess
          selectedId={filters?.gCSEpassess || 0}
          onSelect={(id) => setfilters({ ...filters, gCSEpassess: id })}
        />
      </Stack>
      <Stack
        marginTop={2}
        spacing={2}
        direction={{
          xs: 'column',
          sm: 'column',
          md: 'row',
        }}
      >
        <EducationLevel
          selectedId={filters?.maximumEducationLevelId || ''}
          onSelect={(id) => setfilters({ ...filters, maximumEducationLevelId: id })}
        />
        <EducationalQualification
          selectedId={filters?.academicQualificationId || ''}
          onSelect={(id) => setfilters({ ...filters, academicQualificationId: id })}
          sectorId={filters?.sectorId}
        />
        <ProfessionalQualification
          selectedId={filters?.professionalQualificationId || ''}
          onSelect={(id) => setfilters({ ...filters, professionalQualificationId: id })}
          sectorId={filters?.sectorId}
        />
        <LoadingButton
          disabled={!filters}
          variant="contained"
          onClick={() => filters && findTalents(filters)}
        >
          <Typography
            sx={{
              pl: 5,
              pr: 5,
            }}
          >
            Search
          </Typography>
        </LoadingButton>
      </Stack>
      <Stack
        sx={{
          mt: 5,
          mb: 5,
        }}
      >
        <Stack
          spacing={2}
          direction={{
            xs: 'column',
            sm: 'column',
            md: 'row',
            lg: 'row',
            xl: 'row',
          }}
        >
          {error && <Alert severity="warning">{error}</Alert>}
          {loading ? <Loader />
            : talents?.map((talent) => (
              <Card
                key={talent.profile?.firstname}
                sx={{
                  padding: 3,
                }}
              >
                <Typography>
                  {`${talent.profile?.firstname} ${talent.profile?.lastName}`}
                </Typography>
                {talent.experiences?.map((ex) => (
                  <Stack
                    key={ex.id}
                  >
                    <Typography
                      variant="caption"
                    >
                      {ex.designation.title}
                      {' '}
                      {`From: ${ex.from} To: ${ex.to}`}
                    </Typography>
                  </Stack>
                ))}
              </Card>
            ))}
        </Stack>
      </Stack>
    </PageContainer>
  );
};
