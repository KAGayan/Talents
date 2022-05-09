import { apiService } from 'api';
import { useState, useEffect } from 'react';
import {
  Designation, Qualification, Sector, Skill,
} from 'types';

interface ResumeData {
    isSectorsLoaded: boolean;
    isOthersLoaded: boolean;
    selectedSector?: Sector;
    sectors?: Sector[];
    skills?: Skill[];
    designations?: Designation[];
    academicQualification?: Qualification[];
    professionalQualification?: Qualification[];
}

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    isSectorsLoaded: false,
    isOthersLoaded: false,
  });

  const getSectors = async () => {
    const sectors = await apiService.Resume.getSectors();
    setResumeData({ ...resumeData, sectors, isSectorsLoaded: true });
  };

  useEffect(() => {
    getSectors();
  }, []);

  const getDataBySector = async (id: string) => {
    setResumeData({ ...resumeData, isOthersLoaded: false });
    const academicQualification = await apiService.Resume.getAcademicQualification(id);
    const professionalQualification = await apiService.Resume.getProfessionalQualification(id);
    const designations = await apiService.Resume.getDesignations(id);
    const sk = await apiService.Resume.getSkills(id);

    setResumeData({
      ...resumeData,
      academicQualification,
      professionalQualification,
      designations,
      skills: sk,
      isOthersLoaded: true,
    });
  };

  useEffect(() => {
    resumeData.selectedSector && getDataBySector(resumeData.selectedSector.id);
  }, [resumeData.selectedSector]);

  return { resumeData, setResumeData };
};
