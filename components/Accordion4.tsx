import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import minus from "../public/minus.svg";
import plus from "../public/plus.svg";
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
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

const Accordion4: React.FC<AccordionProps> = ({question, answer, turn, setTurn, idx}) => {

    const contentRef = useRef<HTMLDivElement>(null);

    const[mustIncludeMedias, setMustIncludeMedias] = useState('');
    const[mustExcludeMedias, setMustExcludeMedias] = useState('');
    const[preference, setPreferences] = useState('');

    const fillPrompt = useSetRecoilState(promptStore);

    const handleRadioChange = (mediaType: string, value: string) => {
        if (value === 'Yes') {
          setMustIncludeMedias((prev) => (prev ? `${prev},${mediaType}` : mediaType));
        } else if (value === 'No') {
          setMustExcludeMedias((prev) => (prev ? `${prev},${mediaType}` : mediaType));
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
                <div>
                    <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Radio</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={(e) => handleRadioChange('Radio', e.target.value)}
                        >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Outdoor</FormLabel>
                      <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          onChange={(e) => handleRadioChange('Outdoor', e.target.value)}
                      >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                </FormControl>
                </div>
                <div>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Cinema</FormLabel>
                      <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          onChange={(e) => handleRadioChange('Cinema', e.target.value)}
                      >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                </FormControl>
                </div>
                <div>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Airport</FormLabel>
                      <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          onChange={(e) => handleRadioChange('Airport', e.target.value)}
                      >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                </FormControl>
                </div>
                <div>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Newspaper</FormLabel>
                      <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          onChange={(e) => handleRadioChange('Newspaper', e.target.value)}
                      >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                </FormControl>
                </div>
                <div>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Hyperlocal</FormLabel>
                      <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          onChange={(e) => handleRadioChange('Hyperlocal', e.target.value)}
                      >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                </FormControl>
                </div>
                <div>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Influencer</FormLabel>
                      <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          onChange={(e) => handleRadioChange('Influencer', e.target.value)}
                      >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                </FormControl>
                </div>
                <div>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Digital</FormLabel>
                      <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          onChange={(e) => handleRadioChange('Digital', e.target.value)}
                      >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                </FormControl>
                </div>
                <div>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Television</FormLabel>
                      <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          onChange={(e) => handleRadioChange('Television', e.target.value)}
                      >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                </FormControl>
                </div>
                <div>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Sports-marketing</FormLabel>
                      <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          onChange={(e) => handleRadioChange('Sports-marketing', e.target.value)}
                      >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                </FormControl>
                </div>
                <div>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Nontraditional</FormLabel>
                      <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          onChange={(e) => handleRadioChange('Nontraditional', e.target.value)}
                      >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                </FormControl>
                </div>
                <div>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Magazine</FormLabel>
                      <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          onChange={(e) => handleRadioChange('Magazine', e.target.value)}
                      >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                </FormControl>
                </div>
                <div>
                  <Typography variant='subtitle1'>Other Media Preference</Typography>
                  <Textarea onChange={(e)=>{
                    setPreferences(e.target.value);
                  }} name="Outlined" placeholder="Additional Comments..." variant="outlined" />
                </div>
                <div className='flex justify-center my-5'>
                    <Button onClick={()=>{
                        var hold = '';
                        hold += ' Must include medias (Tv, Newspaper etc) (can be multiple): ' + mustIncludeMedias + ' , ';
                        hold += 'Must exclude medias (Tv, Newspaper etc) (can be multiple): ' + mustExcludeMedias + ' , ';
                        hold += 'Preference( a para): ' + preference + ' . ';
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

export default Accordion4;