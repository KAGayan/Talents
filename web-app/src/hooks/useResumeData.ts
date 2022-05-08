import { apiService } from 'api';
import { useState, useEffect } from 'react';
import {
  Designation, Qualification, Sector, Skill,
} from 'types';

interface ResumeData {
    selectedSector?: Sector;
    sectors?: Sector[];
    skills?: Skill[];
    designations?: Designation[];
    academicQualification?: Qualification[];
    professionalQualification?: Qualification[];
}

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({});

  const getSectors = async () => {
    const sectors = await apiService.Resume.getSectors();
    setResumeData({ ...resumeData, sectors });
  };

  useEffect(() => {
    getSectors();
  }, []);

  const getDataBySector = async (id: string) => {
    const academicQualification = await apiService.Resume.getAcademicQualification(id);
    setResumeData({ ...resumeData, academicQualification });
    const professionalQualification = await apiService.Resume.getProfessionalQualification(id);
    setResumeData({ ...resumeData, professionalQualification });
    const designations = await apiService.Resume.getDesignations(id);
    setResumeData({ ...resumeData, designations });
    const sk = await apiService.Resume.getSkills(id);
    setResumeData({ ...resumeData, skills: sk });
  };

  useEffect(() => {
    resumeData.selectedSector && getDataBySector(resumeData.selectedSector.id);
  }, [resumeData.selectedSector]);

  return { resumeData, setResumeData };
};
