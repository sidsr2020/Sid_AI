import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import minus from "../public/minus.svg";
import plus from "../public/plus.svg";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, Slider, TextField, Typography } from '@mui/material';
import { Textarea } from '@mui/joy';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useSetRecoilState } from 'recoil';
import { promptStore } from '@/store/atoms/promptStore';

interface AccordionProps{
    question: string,
    answer: string,
    turn: boolean[],
    idx: number,
    setTurn: Dispatch<SetStateAction<boolean[]>>,
};


const Accordion2: React.FC<AccordionProps> = ({question, answer, turn, setTurn, idx}) => {

    const contentRef = useRef<HTMLDivElement>(null);

    const[marketingObjective, setMarketingObjective] = useState('');
    const[campaignBudget, setCampaignBudget] = useState('');
    const[businessObjective, setBusinessObjective] = useState('');
    const[campaignDuration, setCampaignDuration] = useState('');
    const[availabeAdTypes, setAvailableAdTypes] = useState('');
    const[campaignRequirement, setCampaignRequirement] = useState('');
    const[campaignStartDate, setCampaignStartDate] = useState('');

    const fillPrompt = useSetRecoilState(promptStore);

    const handleCheckboxChange = (event: any) => {
      const { value, checked } = event.target;
  
      // If checked, add the value to the list; if unchecked, remove it
      if (checked) {
        setAvailableAdTypes((prevTypes) =>
          prevTypes ? `${prevTypes},${value}` : value
        );
      } else {
        setAvailableAdTypes((prevTypes) =>
          prevTypes
            .split(',')
            .filter((type) => type !== value)
            .join(',')
        );
      }
    };

    const handleDateChange = (date: any) => {
      // The 'date' parameter will contain the selected date
      setCampaignStartDate(date.format('MM/DD/YYYY')); // Set the desired date format
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
            <div className='flex justify-between my-10'>
              <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Marketing Objective</FormLabel>
                      <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          onChange={(e)=>{
                            setMarketingObjective(e.target.value);
                          }}
                      >
                          <FormControlLabel value="Awarness" control={<Radio />} label="Awarness" />
                          <FormControlLabel value="Consideration" control={<Radio />} label="Consideration" />
                          <FormControlLabel value="Sales" control={<Radio />} label="Sales" />
                      </RadioGroup>
              </FormControl>

              <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Business Objective</FormLabel>
                      <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          onChange={(e)=>{
                            setBusinessObjective(e.target.value);
                          }}
                      >
                          <FormControlLabel value="Sales" control={<Radio />} label="Sales" />
                          <FormControlLabel value="Website traffic" control={<Radio />} label="Website traffic" />
                          <FormControlLabel value="Store footfall" control={<Radio />} label="Store footfall" />
                          <FormControlLabel value="App install" control={<Radio />} label="App install" />
                      </RadioGroup>
              </FormControl>
            </div>
            <div className='flex flex-row justify-between'>
              <div className='w-2/4'>
                <TextField
                onChange={(e)=>{
                  setCampaignBudget(e.target.value);
                }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}
                  id="outlined-basic" label="Campaign Budget" variant="outlined" />
              </div>
              <div className='w-2/4'>
                <TextField
                onChange={(e)=>{
                  setCampaignDuration(e.target.value);
                }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Days</InputAdornment>,
                  }}
                  id="outlined-basic" label="Campaign Duration" variant="outlined" />
              </div>
            </div>
            <div className='flex flex-col gap-4 my-4'>
              <div>
                <Typography variant='subtitle1'>Campaign Requirement</Typography>
                <Textarea 
                onChange={(e)=>{
                  setCampaignRequirement(e.target.value);
                }} name="Outlined" placeholder="Type in here…" variant="outlined" />
              </div>
              <div className='flex flex-col gap-3'>
                <Typography variant='subtitle1'>Available Ad Type</Typography>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox value="Video" onChange={handleCheckboxChange} />}
                    label="Video"
                  />
                  <FormControlLabel
                    control={<Checkbox value="Audio" onChange={handleCheckboxChange} />}
                    label="Audio"
                  />
                  <FormControlLabel
                    control={<Checkbox value="Image" onChange={handleCheckboxChange} />}
                    label="Image"
                  />
                </FormGroup>
              </div>
              <div className='flex flex-col gap-4 justify-center w-2/4'>
                <Typography variant='subtitle1'>Campaign Start Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={campaignStartDate} // Set the selected date
                    onChange={handleDateChange} // Handle date changes
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className='flex justify-center my-5'>
              <Button onClick={()=>{
                var hold = '';
                hold += ' Marketing Objective (Awareness or Consideration or Trial): ' + marketingObjective + ' , ';
                hold += 'Campaign Budget (between INR 10000 and 20 crore): ' + campaignBudget + ' , ';
                hold += 'Business Objective(Sales or Website traffic or Store footfall or App install): ' + businessObjective + ' , ';
                hold += 'Campaign Duration(in days, this can be flexible or not depending on user): ' + campaignDuration + ' , ';
                hold += 'Available Ad Type (multiple options can be selected: Video, Audio, Image): ' + availabeAdTypes + ' , ';
                hold += 'Campaign Requirement Description(a para): ' + campaignRequirement + ' . ';
                hold += 'Campaign Start Date(mm/dd/yyyy): ' + campaignStartDate + ' . ';
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

export default Accordion2;