import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import { apiService } from 'api';
import { useEffect, useState } from 'react';
import { Sector } from 'types';

interface Props {
    onSelect: (selectedId: string) => void;
    selectedId: string;
}

export const SectorsSelect = ({ onSelect, selectedId }: Props) => {
  const [sectors, setSectors] = useState<Sector[] | undefined>();

  const loadSectores = async () => {
    const secList = await apiService.Resume.getSectors();
    setSectors(secList);
  };

  useEffect(() => {
    loadSectores();
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel id="sector-label">Sector</InputLabel>
      <Select
        labelId="sector-label"
        id="sector"
        value={selectedId}
        label="Sector"
        onChange={(e) => onSelect(e.target.value)}
      >
        {sectors?.map((sector) => (
          <MenuItem
            key={sector.id}
            value={sector.id}
          >
            {sector.title}
          </MenuItem>
        ))}

      </Select>
    </FormControl>
  );
};
