import { apiRequest } from 'api';
import {
  Designation, Qualification, Resume as ResumeRespons, Sector, Skill,
} from 'types';

export const Resume = {
  get: (userId: string) => apiRequest.post<ResumeRespons>(
    '/CurriculumVitae/resume',
    { empId: userId },
  ),
  getSectors: () => apiRequest.get<Sector[]>(
    '/CurriculumVitae/LoadSector',
  ),
  getAcademicQualification: (sectorId: string) => apiRequest.get<Qualification[]>(
    `/CurriculumVitae/LoadEduQual?sectorId=${sectorId}`,
  ),
  getProfessionalQualification: (sectorId: string) => apiRequest.get<Qualification[]>(
    `/CurriculumVitae/LoadProfQual?sectorId=${sectorId}`,
  ),
  getDesignations: (sectorId: string) => apiRequest.get<Designation[]>(
    `/CurriculumVitae/LoadJob?sectorId=${sectorId}`,
  ),
  getSkills: (sectorId: string) => apiRequest.get<Skill[]>(
    `/CurriculumVitae/LoadSkill?sectorId=${sectorId}`,
  ),
  getMaximumEducationLevel: () => apiRequest.get<Qualification[]>(
    '/CurriculumVitae/LoadEduLevel',
  ),
  save: (userId: string, body: ResumeRespons) => apiRequest.post<ResumeRespons>(
    'CurriculumVitae/save',
    {
      empId: userId,
      curriculum: body,
    },
  ),
};
