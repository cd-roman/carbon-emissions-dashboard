import {Autocomplete, TextField} from '@mui/material';

type Props = {
    dataArray: string[];
    id: string;
    label?: string,
    shouldFocus?: boolean,
    onSelectValue: (value: string) => void;
};

export const CustomAutocomplete: React.FC<Props> = ({
    dataArray,
    id,
    onSelectValue,
    label, 
    shouldFocus
}) => {
    const handleSelect = (_: React.SyntheticEvent, val: string | null) => {
        if (val) {
            onSelectValue(val);
        }
    }
  
    return (
        <Autocomplete
            id={id}
            options={dataArray}
            sx={{
                width: '100%',
            }}
            onChange={handleSelect}
            disableClearable
            forcePopupIcon={false}
            renderInput={(params) => (
                <TextField
                    autoFocus={shouldFocus}
                    {...params}
                    placeholder={label}
                    size="small"
                    hiddenLabel
                    sx={{
                        border: '1px solid #ECF5ED',
                        borderRadius: '8px',
                        '& fieldset': {
                            border: 'none',
                        },
                        '& input': {
                            padding: '0 5px',
                            fontSize: '14px',
                            color: '#61463a',
                            backgroundColor: '#fff',

                            '&::placeholder': {
                                opacity: 1,
                                color: '#c1b9b2',
                            }
                        },
                        '& .MuiOutlinedInput-root': {
                            padding: 0,
                        },
                        '& .MuiFormLabel-filled': {
                            color: 'rgba(0, 0, 0, 0.6)',
                        },
                    }}
                />
            )}
        />
    );
};
