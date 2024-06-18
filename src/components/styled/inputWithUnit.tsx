import styled from "@emotion/styled";
import {
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  SelectProps,
  TextField,
  TextFieldProps,
} from "@mui/material";

type UnitType = string | { value: string; name: string };

type InputWithUnitProps = TextFieldProps & {
  units: UnitType[] | string;
  unitProps?: SelectProps;
};

export const InputWithUnit = styled(
  ({
    units,
    unitProps,
    ...props
  }: InputWithUnitProps) => (
    <TextField
      {...props}
      InputProps={{
        endAdornment:
          typeof units === "string" ? (
            <InputAdornment position="end" sx={{
              '& p.MuiTypography-root': {
                color: "var(--text)",
              },
            }}>{units}</InputAdornment>
          ) : (
            <FormControl>
              <Select
                sx={{
                  color: "var(--text)",
                  paddingRight: 0,
                  "& svg": {
                    display: "none",
                  },
                  "& > div.MuiSelect-select": {
                    paddingRight: "0 !important",
                  },
                  "& fieldset": {
                    border: "none",
                  },
                }}
                {...unitProps}
              >
                {units.map((u) =>
                  typeof u === "string" ? (
                    <MenuItem key={u} value={u}>
                      {u}
                    </MenuItem>
                  ) : (
                    <MenuItem key={u.value} value={u.value}>
                      {u.name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          ),
      }}
    />
  )
)();

const InputWithUnitStyled = styled(InputWithUnit)({
  '&': {
    height: "100%",
    backgroundColor: "var(--bgSoft)",
    borderRadius: "4px"
  },
  '& input': {
    color: "var(--text)"
  },
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "var(--text)",
  },
  '& label': {
    backgroundColor: "var(--bgSoft)",
    borderRadius: "4px",
    paddingLeft: "5px",
    paddingRight: "5px",
    color: "var(--text)",
  },
});

export default InputWithUnitStyled;
