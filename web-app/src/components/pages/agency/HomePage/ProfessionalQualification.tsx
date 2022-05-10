import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import { apiService } from 'api';
import { useEffect, useState } from 'react';
import { Qualification } from 'types';

interface Props {
    onSelect: (selectedId: string) => void;
    selectedId: string;
    sectorId?: string;
}

export const ProfessionalQualification = ({ onSelect, selectedId, sectorId }: Props) => {
  const [value, setValue] = useState<Qualification[]>();

  const loadData = async (id: string) => {
    const pq = await apiService.Resume.getProfessionalQualification(id);
    setValue(pq);
  };

  useEffect(() => {
    sectorId && loadData(sectorId);
  }, [sectorId]);

  return (
    <FormControl fullWidth>
      <InputLabel id="ProfessionalQualification-label">Professional Qualification</InputLabel>
      <Select
        labelId="ProfessionalQualification-label"
        id="ProfessionalQualification"
        value={selectedId}
        label="ProfessionalQualification"
        onChange={(e) => onSelect(e.target.value)}
        disabled={!sectorId}
      >
        {value?.map((val) => (
          <MenuItem
            key={val.id}
            value={val.id}
          >
            {val.title}
          </MenuItem>
        ))}

      </Select>
    </FormControl>
  );
};
