import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import { apiService } from 'api';
import { useEffect, useState } from 'react';
import { Qualification } from 'types';

interface Props {
    onSelect: (selectedId: string) => void;
    selectedId: string;
}

export const EducationLevel = ({ onSelect, selectedId }: Props) => {
  const [value, setValue] = useState<Qualification[] | undefined>();

  const loadSectores = async () => {
    const maximumEducationLevel = await apiService.Resume.getMaximumEducationLevel();
    setValue(maximumEducationLevel);
  };

  useEffect(() => {
    loadSectores();
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel id="EducationLevel-label">Education Level</InputLabel>
      <Select
        labelId="EducationLevel-label"
        id="EducationLevel"
        value={selectedId}
        label="Education Level"
        onChange={(e) => onSelect(e.target.value)}
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
