import React, {useEffect, useState} from 'react';
import {
  FormControl,
  IconButton, 
  InputAdornment, 
  OutlinedInput,
  SvgIcon,
} from '@mui/material';

import { ReactComponent as PlusIcon } from '../../../assets/plus.svg';
import {ReactComponent as MinusIcon} from '../../../assets/minus.svg';

type Props = {
  id: number | string;
  min: number;
  max: number;
  starFrom: number;
  onChangeValue: (val: number) => void;
};

export const CustomNumInput: React.FC<Props> = ({
  id,
  min,
  max,
  starFrom,
  onChangeValue,
}) => {
  const [value, setValue] = useState<number>(starFrom);

  const iconSize = {
    fontSize: 12,
  }

  useEffect(() => {
    setValue(starFrom);
  }, [starFrom]);

  const handleAdd = () => {
    setValue(currentValue => currentValue + 1);
    onChangeValue(value + 1)
  }

  const handleSubtract = () => {
    setValue(currentValue => currentValue - 1);
    onChangeValue(value - 1);
  }

  const hadleChangeValue = (value: number) => {
    setValue(value);
    onChangeValue(value);
  }
  
  return (
    <FormControl
      sx={{ width: '100%' }}
      variant="outlined"
      id={`customNumInput-${id}`}
    >
      <OutlinedInput
        type="number"
        value={value}
        onChange={(e) => hadleChangeValue(+e.target.value)}
        
        startAdornment={
          <InputAdornment
            position="start"
            sx={{margin: 0}}
          >
            <IconButton
              aria-label="delete"
              size="small"
              disabled={value <= min}
              sx={{
                '& svg': {
                  ...iconSize
                },
                '&:disabled': {
                  opacity: '0.6'
                },
                padding: '3px',
              }}
              onClick={handleSubtract}
            >
              <SvgIcon
                component={MinusIcon}
                fontSize='small'
                viewBox='0 0 12 12'
              >
                
              </SvgIcon>
            </IconButton>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end" sx={{margin: 0}}>
            <IconButton
              aria-label="add"
              size="small"
              disabled={value >= max}
              onClick={handleAdd}
              sx={{
                '& svg': {
                  ...iconSize,
                },
                '&:disabled': {
                  opacity: '0.6'
                },
                padding: '3px',
              }}
            >
              <SvgIcon
                component={PlusIcon}
                fontSize='small'
                viewBox='0 0 12 12'
              />
            </IconButton>
          </InputAdornment>
        }
  
        sx={{
          justifyContent: 'center',
          textAlign: 'center',
          padding: '7px 0',
          borderRadius: '8px',
          color: '#61463a',
          fontFamily: 'inherit',
          fontSize: 14,
          fontWeight: 500,

          "& input": {
            padding: 0,
            flex: '0 1 20px',
            textAlign: 'center',
          },

          '& fieldset': {
            border: '1px solid #ECF5ED',
            borderRadius: '8px',
            transition: 'all .3s ease',
          },

          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#61B766',
          },

          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#61B766',
            borderWidth: 1,
          }

        }}
      />
    </FormControl>
  );
};
