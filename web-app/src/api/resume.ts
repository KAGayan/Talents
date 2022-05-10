import { apiRequest } from 'api';
import {
  Designation, Filters, Qualification, Resume as ResumeRespons, Sector, Skill,
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
  findTalents: (body: Filters) => apiRequest.post<ResumeRespons[]>(
    'CurriculumVitae/filter',
    {
      secId: body.sectorId,
      jobId: body.skillId,
      eduLevelId: body.maximumEducationLevelId,
      gcsePasses: body.gCSEpassess,
      eduQualId: body.academicQualificationId,
      professionalQualId: body.professionalQualificationId,
      skillId: body.sectorId,
      experienceId: body.experienceYears,
    },
  ),
};
