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

export const EducationalQualification = ({ onSelect, selectedId, sectorId }: Props) => {
  const [value, setValue] = useState<Qualification[]>();

  const loadData = async (id: string) => {
    const aq = await apiService.Resume.getAcademicQualification(id);
    setValue(aq);
  };

  useEffect(() => {
    sectorId && loadData(sectorId);
  }, [sectorId]);

  return (
    <FormControl fullWidth>
      <InputLabel id="Educational Qualification-label">Educational Qualification</InputLabel>
      <Select
        labelId="Educational Qualification-label"
        id="Educational Qualification"
        value={selectedId}
        label="Educational Qualification"
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
