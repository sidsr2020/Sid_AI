import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import minus from "../public/minus.svg";
import plus from "../public/plus.svg";
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Textarea from '@mui/joy/Textarea';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { promptStore } from '@/store/atoms/promptStore';

interface AccordionProps{
    question: string,
    answer: string,
    turn: boolean[],
    idx: number,
    setTurn: Dispatch<SetStateAction<boolean[]>>,
};

const Accordion1: React.FC<AccordionProps> = ({question, answer, turn, setTurn, idx}) => {

    const contentRef = useRef<HTMLDivElement>(null);

    const[category, setCategory] = useState('');
    const[salesChannel, setSalesChannel] = useState('');

    const[brandName, setBrandName] = useState('');
    const[website, setWebsite] = useState('');
    const[emailId, setEmailId] = useState('');
    const[description, setDescription] = useState('');

    const fillPrompt = useSetRecoilState(promptStore);


    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
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
                    <TextField onChange={(e)=>{
                        setEmailId(e.target.value);
                    }} id="outlined-basic" label="Email" variant="outlined" />
                    <TextField onChange={(e)=>{
                        setBrandName(e.target.value);
                    }} id="outlined-basic" label="Brand Name" variant="outlined" />
                </div>

                <div className='flex justify-between my-10'>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Sales Channel</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                onChange={(e)=>{
                                    setSalesChannel(prevSalesChannel => prevSalesChannel + ' , ' + e.target.value);
                                }}
                            >
                                <FormControlLabel value="App" control={<Radio />} label="App" />
                                <FormControlLabel value="Website" control={<Radio />} label="Website" />
                                <FormControlLabel value="Online" control={<Radio />} label="Online" />
                            </RadioGroup>
                    </FormControl>

                    <TextField onChange={(e)=>{
                        setWebsite(e.target.value);
                    }} id="outlined-basic" label="Website or Social Media (LinkedIn, FB, IG etc)" variant="outlined" />
                </div>

                <div className='flex justify-center'>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={handleChange}
                            >
                                <MenuItem value="Agriculture">Agriculture</MenuItem>
                                <MenuItem value="Automobile">Automobile</MenuItem>
                                <MenuItem value="Electronic & Gadgets">Electronics & Gadgets</MenuItem>
                                <MenuItem value="Engineering">Engineering</MenuItem>
                                <MenuItem value="Entertainment">Entertainment</MenuItem>
                                <MenuItem value="Event">Event</MenuItem>
                                <MenuItem value="Fashion & Lifestyle">Fashion & Lifestyle</MenuItem>
                                <MenuItem value="Finance">Finance</MenuItem>
                                <MenuItem value="Fitness & Health">Fitness and Health</MenuItem>
                                <MenuItem value="Food & Restaurant">Food & Restaurant</MenuItem>
                                <MenuItem value="FMCG">FMCG</MenuItem>
                                <MenuItem value="Healthcare">Healthcare</MenuItem>
                                <MenuItem value="Home Decor & Construction">Home Decor & Construction</MenuItem>
                                <MenuItem value="Hospitality">Hospitality</MenuItem>
                                <MenuItem value="IT Product & Services">IT Product & Services</MenuItem>
                                <MenuItem value="Real Estate">Real Estate</MenuItem>
                                <MenuItem value="Services">Services</MenuItem>
                                <MenuItem value="Shopping & Retail">Shopping & Retail</MenuItem>
                                <MenuItem value="Social Enterprise & Trust">Social Enterprise & Trust</MenuItem>
                                <MenuItem value="Transportation & Logistics">Transportation & Logistics</MenuItem>
                                <MenuItem value="Travel & Tourism">Travel & Tourism</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className='flex flex-col gap-4 my-4'>
                    <Typography variant='subtitle1'>Describe your product</Typography>
                    <Textarea onChange={(e)=>{
                        setDescription(e.target.value);
                    }} name="Outlined" placeholder="Type in here…" variant="outlined" />
                </div>
                <div className='flex justify-center my-5'>
                <Button onClick={()=>{
                    var hold = '';
                    hold += 'Brand Name:' + brandName + ' , ';
                    hold += 'Website or Social Media (LinkedIn, FB, IG etc): ' + website + ' , ';
                    hold += 'Email ID: ' + emailId + ' , ';
                    hold += 'Sales Channel (can be multiple: App or Website or Offline): ' + salesChannel + ' , ';
                    hold += 'Website Category(only one): ' + category + ' , ';
                    hold += 'Description(a paragraph): ' + description + '. ';
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

export default Accordion1;