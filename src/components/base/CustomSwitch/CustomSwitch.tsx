import {useState} from "react";
import styles from "./CustomSwitch.module.scss";
import {Switch} from "@mui/material";



type CustomSwitchProps = {
  label1: string;
  label2: string;
  value: boolean;
  setValue: (c: boolean) => void;
  type: string;
  setGlobalValue: (c: any) => void;
};
export const CustomSwitch = ({label1, label2, value, setValue, type, setGlobalValue}: CustomSwitchProps) => {
    const [active , setActive] = useState(type === label2)

    const handleChange = () => {
        setValue(!value)
        setGlobalValue(type === label2 ? label1 : label2)
        setActive(!active)
    }

    return <div style={{
        position:"relative",
        display:"flex",
    }}>
        <span onClick={handleChange} className={`${styles.switchText} ${styles.switchTextLeft} ${!active ? styles.active : ''}`}>
            {label1}</span>
        <Switch
            sx={{
                width: '81px',
                height: '43px',
                border: '1px solid #61B766',
                borderRadius: '46px',
                '& .MuiButtonBase-root':{
                    margin: '3px',
                    padding: '8px',
                    width: '35px',
                    height: '35px',
                    display: 'block',
                    boxSizing: 'border-box',
                    background: '#61B766',
                    '&.Mui-checked': {
                        background: '#61B766',
                        transform: 'translateX(38px)',
                        '&:hover': {
                            background: '#61B766',
                            opacity: '0.7'
                        }
                    },
                    '&:hover': {
                        background: '#61B766',
                        opacity: '0.7'
                    }
                },
                '& .MuiSwitch-track': {
                    display:'none'
                }
            }}
            checked={value}
            onChange={handleChange}
            inputProps={{'aria-label': 'controlled'}}
        />
        <span onClick={handleChange} className={`${styles.switchText} ${styles.switchTextRight} ${active ? styles.active : ''}`}>{label2}</span>
    </div>

}