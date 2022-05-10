import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';

interface Props {
    onSelect: (selectedId: number) => void;
    selectedId: number;
}

export const GCSEpassess = ({ onSelect, selectedId }: Props) => (
  <FormControl fullWidth>
    <InputLabel id="GCSEpassess-label">GCSE passess</InputLabel>
    <Select
      labelId="GCSEpassess-label"
      id="GCSEpassess"
      value={selectedId}
      label="GCSE passess"
    >
      {[0, 1, 2, 3, 4, 5].map((ex) => (
        <MenuItem
          key={ex}
          value={ex}
          onClick={() => onSelect(ex)}
        >
          {ex}
        </MenuItem>
      ))}

    </Select>
  </FormControl>
);
