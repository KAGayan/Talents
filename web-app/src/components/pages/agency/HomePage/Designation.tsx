import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import { apiService } from 'api';
import { useEffect, useState } from 'react';
import { Designation as Des } from 'types';

interface Props {
    onSelect: (selectedId: string) => void;
    selectedId: string;
    sectorId?: string;
}

export const Designation = ({ onSelect, selectedId, sectorId }: Props) => {
  const [value, setValue] = useState<Des[]>();

  const loadData = async (id: string) => {
    const des = await apiService.Resume.getDesignations(id);
    setValue(des);
  };

  useEffect(() => {
    sectorId && loadData(sectorId);
  }, [sectorId]);

  return (
    <FormControl fullWidth>
      <InputLabel id="Designation-label">Designation</InputLabel>
      <Select
        labelId="Designation-label"
        id="Designation"
        value={selectedId}
        label="Designation"
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
