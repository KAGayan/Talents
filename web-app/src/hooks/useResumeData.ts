import { apiService } from 'api';
import { useState, useEffect } from 'react';
import {
  Designation, Qualification, Sector, Skill,
} from 'types';
import { useMappedState } from './useMappedState';

interface ResumeData {
    isSectorsLoaded: boolean;
    loadingOther: boolean;
    isOthersLoaded: boolean;
    selectedSector?: Sector;
    sectors?: Sector[];
    skills?: Skill[];
    designations?: Designation[];
    academicQualification?: Qualification[];
    professionalQualification?: Qualification[];
    maximumEducationLevel?: Qualification[];
}

export const useResumeData = () => {
  const { user: { user } } = useMappedState((state) => state);
  const [resumeData, setResumeData] = useState<ResumeData>({
    isSectorsLoaded: false,
    loadingOther: false,
    isOthersLoaded: false,
  });

  const getDataBySector = async (id: string) => {
    setResumeData({ ...resumeData, loadingOther: true, isOthersLoaded: false });
    const academicQualification = await apiService.Resume.getAcademicQualification(id);
    const professionalQualification = await apiService.Resume.getProfessionalQualification(id);
    const designations = await apiService.Resume.getDesignations(id);
    const sk = await apiService.Resume.getSkills(id);
    const maximumEducationLevel = await apiService.Resume.getMaximumEducationLevel();

    setResumeData({
      ...resumeData,
      academicQualification,
      professionalQualification,
      designations,
      skills: sk,
      maximumEducationLevel,
      loadingOther: false,
      isOthersLoaded: true,
    });
  };

  const getSectors = async () => {
    const sectors = await apiService.Resume.getSectors();
    if (user?.id) {
      const res = await apiService.Resume.get(user.id);
      setResumeData({
        ...resumeData,
        sectors,
        isSectorsLoaded: true,
        selectedSector: res?.sector,
      });
    }
  };

  useEffect(() => {
    getSectors();
  }, []);

  useEffect(() => {
    resumeData.selectedSector?.id && getDataBySector(resumeData.selectedSector.id);
  }, [resumeData.selectedSector?.id]);

  return { resumeData, setResumeData };
};
