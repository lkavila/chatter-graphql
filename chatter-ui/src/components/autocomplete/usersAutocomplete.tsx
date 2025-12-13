import { useLazyQuery } from "@apollo/client/react";
import { Autocomplete, TextField } from "@mui/material";
import { useState, useMemo } from "react";
import { searchUsersDocument } from "../../hooks/users/useSearchUsers";
import { debounce } from "../../utils/helpers";
import { SearchUser } from "../../gql/graphql";

interface UsersAutocompleteProps {
  onSelect: (userIds: string[]) => void;
  multiple?: boolean;
}

const UsersAutocomplete = ({ onSelect, multiple }: UsersAutocompleteProps) => {
  const [options, setOptions] = useState<SearchUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<SearchUser[]>([]);
   const [searchUsers, { loading, data }] = useLazyQuery(searchUsersDocument);

  // debounce searching
  const debouncedSearch = useMemo(
    () =>
      debounce(async (value: string) => {
        if (value.trim().length >= 1) {
          await searchUsers({ variables: { search: value } });
          setOptions(data?.searchUsers || []);
        }
      }, 200),
    [data?.searchUsers, searchUsers]
  );

  const handleInputChange = (value: string) => {
    setOptions([]);
    debouncedSearch(value);
  };

  const handleChange = (event: any, value: SearchUser | SearchUser[] | null) => {
    if (!Array.isArray(value) && value) {
      onSelect([value._id]);
      return;
    };
    setSelectedUsers(value ? value : []);
    onSelect(value?.map((u) => u._id) || []); // return only IDs to parent
  };

  return (
    <Autocomplete
      multiple={multiple}
      options={options}
      getOptionLabel={(option) => option.username}
      value={multiple ? selectedUsers : selectedUsers[0]}
      onChange={handleChange}
      filterOptions={(x) => x} // disable client filtering
      onInputChange={(e, value) => handleInputChange(value)}
      loading={loading}
      style={{ width: '100%' }}
      renderInput={(params) => (
        <TextField {...params} label="Search users..." />
      )}
    />
  );
}

export default UsersAutocomplete;
