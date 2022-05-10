import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';

interface Props {
    onSelect: (selectedId: number) => void;
    selectedId: number;
}

export const Experience = ({ onSelect, selectedId }: Props) => (
  <FormControl fullWidth>
    <InputLabel id="experience-label">Experience</InputLabel>
    <Select
      labelId="experience-label"
      id="experience"
      value={selectedId}
      label="Experience"
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ex) => (
        <MenuItem
          key={ex}
          value={ex}
          onClick={() => onSelect(ex)}
        >
          {`${ex} years`}
        </MenuItem>
      ))}

    </Select>
  </FormControl>
);
