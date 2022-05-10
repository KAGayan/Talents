import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import { apiService } from 'api';
import { useEffect, useState } from 'react';
import { Skill } from 'types';

interface Props {
    onSelect: (selectedId: string) => void;
    selectedId: string;
    sectorId?: string;
}

export const SkillsSelect = ({ onSelect, selectedId, sectorId }: Props) => {
  const [skills, setSkills] = useState<Skill[] | undefined>();

  const loadSelect = async (id: string) => {
    const skillList = await apiService.Resume.getSkills(id);
    setSkills(skillList);
  };

  useEffect(() => {
    sectorId && loadSelect(sectorId);
  }, [sectorId]);

  return (
    <FormControl fullWidth>
      <InputLabel id="skill-label">Skills</InputLabel>
      <Select
        labelId="skill-label"
        id="skill"
        value={selectedId}
        label="Skills"
        onChange={(e) => onSelect(e.target.value)}
        disabled={!sectorId}
      >
        {skills?.map((skill) => (
          <MenuItem
            key={skill.id}
            value={skill.id}
          >
            {skill.title}
          </MenuItem>
        ))}

      </Select>
    </FormControl>
  );
};
