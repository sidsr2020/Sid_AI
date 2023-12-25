import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import minus from "../public/minus.svg";
import plus from "../public/plus.svg";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Textarea from '@mui/joy/Textarea';
import { useSetRecoilState } from 'recoil';
import { promptStore } from '@/store/atoms/promptStore';

interface AccordionProps{
    question: string,
    answer: string,
    turn: boolean[],
    idx: number,
    setTurn: Dispatch<SetStateAction<boolean[]>>,
};

const Accordion3: React.FC<AccordionProps> = ({question, answer, turn, setTurn, idx}) => {

    const contentRef = useRef<HTMLDivElement>(null);

    const[age, setAge] = useState('');
    const[geography, setGeography] = useState('');
    const[gender, setGender] = useState('');
    const[income, setIncome] = useState('');
    const[additonalDetails, setAdditionalDetails] = useState('');

    const fillPrompt = useSetRecoilState(promptStore);

    const handleChange = (event: any) => {
      const selectedValue = event.target.value;
  
      // Update the age state by appending the selected value with a comma
      setAge((prevAge) => prevAge ? `${prevAge},${selectedValue}` : selectedValue);
  };
  

    const handleCheckboxChange = (event: any) => {
      const { value, checked } = event.target;
  
      // If checked, add the value to the list; if unchecked, remove it
      if (checked) {
        setGender((prevGender) => (prevGender ? `${prevGender},${value}` : value));
      } else {
        setGender((prevGender) =>
          prevGender
            .split(',')
            .filter((selectedGender) => selectedGender !== value)
            .join(',')
        );
      }
    };

    const handleCheckboxChangeIncome = (event: any) => {
      const { value, checked } = event.target;
  
      // If checked, add the value to the list; if unchecked, remove it
      if (checked) {
        setIncome((prevIncome) =>
          prevIncome ? `${prevIncome},${value}` : value
        );
      } else {
        setIncome((prevIncome) =>
          prevIncome
            .split(',')
            .filter((incomeType) => incomeType !== value)
            .join(',')
        );
      }
    };

    useEffect(()=>{
        if(contentRef.current){
            contentRef.current.style.maxHeight = turn![idx] ? `${contentRef.current.scrollHeight}px`:"0px"
        }

    },[contentRef, turn, idx])
    const toggleAccordion = () => {
        let newTurn = [...turn!]
        newTurn[idx] = !newTurn[idx]
        setTurn!(newTurn)
    }
    return (
        <div className='flex flex-col items-center justify-center w-full px-2 text-lg pt-4 lg:text-base border-2 rounded-xl border-cyan-900 my-5'>
        <div className='py-3 w-full'>
           <div className='flex items-center justify-between h-14 text-left'>
              <span className='ml-2 font-medium lg:font-semibold lg:text-xl text-sm text-cyan-900'>{question}</span>
              <div>
              <button onClick={toggleAccordion}
                className={`bg-transparent px-5 shadow cursor-pointer ${turn![idx]}`}>
                        { turn![idx] ? <Image src={minus} alt="" width={20} height={20}/> :
                            <Image src={plus} alt="" width={20} height={20}/>}
                </button>
              </div>
           </div>
           <div ref={contentRef} className='mx-4 overflow-hidden text-left transition-all duration-500 h-full'>
                <div className='flex w-full flex-row justify-between gap-20 my-10'>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            onChange={handleChange}
                            >
                                <MenuItem value="12-15">12-15</MenuItem>
                                <MenuItem value="16-19">16-19</MenuItem>
                                <MenuItem value="20-29">20-29</MenuItem>
                                <MenuItem value="30-39">30-39</MenuItem>
                                <MenuItem value="40-49">40-49</MenuItem>
                                <MenuItem value="50+">50+</MenuItem>
                        </Select>
                    </FormControl>

                    <div className='flex flex-col justify-between gap-4 mx-4'>
                      <Typography variant='subtitle1'>Gender</Typography>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox value="Male" onChange={handleCheckboxChange} />}
                          label="Male"
                        />
                        <FormControlLabel
                          control={<Checkbox value="Female" onChange={handleCheckboxChange} />}
                          label="Female"
                        />
                      </FormGroup>
                    </div>
                </div>
                <div className='flex flex-row justify-between gap-10'>
                  <TextField id="outlined-basic" label="Geography" variant="outlined" />
                  <div className='flex flex-col gap-5'>
                    <Typography variant='subtitle1'>Income</Typography>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox value="Low Income" onChange={handleCheckboxChangeIncome} />}
                        label="Low Income"
                      />
                      <FormControlLabel
                        control={<Checkbox value="Middle Income" onChange={handleCheckboxChangeIncome} />}
                        label="Middle Income"
                      />
                      <FormControlLabel
                        control={<Checkbox value="High Income" onChange={handleCheckboxChangeIncome} />}
                        label="High Income"
                      />
                    </FormGroup>
                  </div>
                </div>
                <div>
                  <Typography variant='subtitle1'>Additional Details</Typography>
                  <Textarea onChange={(e)=>{
                    setAdditionalDetails(e.target.value);
                  }} name="Outlined" placeholder="Your Comments..." variant="outlined" />
                </div>
                <div className='flex justify-center my-5'>
                  <Button onClick={()=>{
                    var hold = '';
                    hold += ' Target audience age (can be multiple above 12, such as 12-15 and 40-49 etc): ' + age + ' , ';
                    hold += 'Target Audience Geography(location): ' + geography + ' , ';
                    hold += 'Target Audience Gender(multiple: Male/Female): ' + gender + ' , ';
                    hold += 'Target Audience Income(Low, Middle, High): ' + income + ' , ';
                    hold += 'Additional Details of Target Audience: ' + additonalDetails + ' . ';
                    fillPrompt((prevPrompt) => ({
                      promptValue: prevPrompt.promptValue + hold,
                    }));
                  }} variant="contained" style={{backgroundColor: '#164e63'}}>Save</Button>
                </div>
           </div>
        </div>
    </div>
    );
};

export default Accordion3;