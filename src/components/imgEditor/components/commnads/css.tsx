import { useEffect, useRef, useState } from "react";

import {
  Autocomplete,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { dense_icon_size, dense_size } from "../dense";
import { CSSValue } from "../../types";
import { CSSList, CSSPropertyType } from "../../css_list";

interface CSSInputProps {
  property: CSSPropertyType;
  value: string;
  setCSSs(property: CSSPropertyType, value?: string): void;
  dense: boolean;
}

function CSSInput({ property, value, setCSSs, dense }: CSSInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  return (
    <Stack direction="row">
      <TextField
        label={property}
        inputRef={inputRef}
        fullWidth
        size={dense_size(dense)}
        error={!CSS.supports(property, value)}
        value={value}
        onChange={(ev) => setCSSs(property, ev.target.value)}
      />
      <IconButton onClick={() => setCSSs(property)}>
        <DeleteIcon fontSize={dense_icon_size(dense)} />
      </IconButton>
    </Stack>
  );
}

interface CSSCommandProps {
  csss: CSSValue[];
  setCSSs(property: CSSPropertyType, value?: string): void;
  dense: boolean;
}

export default function CSSCommand({ csss, setCSSs, dense }: CSSCommandProps) {
  const [value, setValue] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");

  return (
    <Stack spacing={0.75}>
      <Stack direction="row">
        <Autocomplete
          disablePortal
          id="css-property-value-selector"
          options={Object.keys(CSSList)}
          clearOnEscape
          handleHomeEndKeys
          clearOnBlur
          fullWidth
          inputValue={searchValue}
          getOptionDisabled={(opt) =>
            csss.find((o) => o.key === opt) !== undefined
          }
          onInputChange={(ev, nv) => {
            setSearchValue(nv);
          }}
          value={value}
          onChange={(ev, nv) => {
            if (nv !== null) {
              setCSSs(nv as CSSPropertyType, "");
              setValue(null);
              setSearchValue("");
              (ev.target as HTMLElement).blur();
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="CSS property"
              fullWidth
              size={dense_size(dense)}
            />
          )}
        />
      </Stack>
      <Stack spacing={0.75}>
        {csss.length === 0 ? (
          <Typography
            sx={{
              color: "grey",
              fontStyle: "italic",
            }}
          >
            No CSS properties added yet
          </Typography>
        ) : (
          csss.map((e) => (
            <CSSInput
              key={e.key}
              property={e.key}
              value={e.value}
              setCSSs={setCSSs}
              dense={dense}
            />
          ))
        )}
      </Stack>
    </Stack>
  );
}
