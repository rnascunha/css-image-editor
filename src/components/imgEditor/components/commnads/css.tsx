import { useState } from "react";

import { CSSPropertyList, CSSs } from "../../constants";

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

interface CSSInputProps {
  property: CSSs;
  value: string;
  setCSSs(property: CSSs, value?: string): void;
  dense: boolean;
}

function CSSInput({
  property,
  value,
  setCSSs,
  dense,
}: CSSInputProps) {
  return (
    <Stack direction="row">
      <TextField
        label={property}
        fullWidth
        size={dense_size(dense)}
        error={value === ""}
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
  setCSSs(property: CSSs, value?: string): void;
  dense: boolean;
}

export default function CSSCommand({
  csss,
  setCSSs,
  dense,
}: CSSCommandProps) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Stack spacing={0.75}>
      <Stack direction="row">
        <Autocomplete
          disablePortal
          id="css-property-value-selector"
          options={Object.keys(CSSPropertyList)}
          clearOnEscape
          handleHomeEndKeys
          clearOnBlur
          fullWidth
          inputValue={searchValue}
          getOptionDisabled={(opt) =>
            csss.find((o) => o.key === opt) !== undefined
          }
          onInputChange={(ev, nv) => searchValue && setSearchValue(nv)}
          onChange={(ev, nv) => {
            if (nv !== null) {
              setCSSs(nv as CSSs, "");
              setSearchValue("");
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
