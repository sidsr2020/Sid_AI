import Image from 'next/image'
import React, { Dispatch, SetStateAction, useState } from 'react'
import down from "../public/down.svg";
import Accordion from './Accordion';
import { Button, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { promptStore } from '@/store/atoms/promptStore';
import { useRouter } from 'next/router';
import { outputStore } from '@/store/atoms/outputStore';




type Props = {
    question :string,
    answer: string,
    idx: number
}




interface LayoutProps {
    handleClick: React.MouseEventHandler<HTMLButtonElement>,
    isSomeActive: any,
    turn: boolean[],
    setTurn: Dispatch<SetStateAction<boolean[]>>,
    data: Props[]
}




const Layout = ({handleClick, isSomeActive, data, turn, setTurn}:LayoutProps) => {
  const promptStoreValue = useRecoilValue(promptStore);
  const router = useRouter();
  const setoutputStoreValue = useSetRecoilState(outputStore);
  const[isLoading, setIsLoading] = useState(false);




  if(!isLoading)
  {
    return (
      <div className='items-center flex flex-col lg:w-7/12 lg:mt-7 w-full my-5 px-4'>
          <Typography variant='h4' sx={{ fontWeight: 'bold' }} style={{color: "#164e63"}}>Campaign Brief</Typography>
        <div className='flex items-center justify-between w-full mb-6 lg:justify-end'>
            <button
                className="flex items-center mr-3 space-x-1 text-sm font-bold lg:text-base lg:space-x-2 py-2 px-4 bg-slate-50"
                onClick={handleClick}
              >
                <span className="text-cyan-900 min-w-fit text-ellipsis"> {!isSomeActive ? "Open All" : "Close All"}</span>
                <div
                  className={
                    "relative transition-all ease-in-out duration-200 " +
                    (isSomeActive ? " rotate-180" : "rotate-0")
                  }
                >
                 <Image src={down} alt="" width={40} height={40}/>
                </div>
              </button>
        </div>
 
        {data.map((el,i)=>{
          return (
              <div className='w-full' key={"questions"+i}>
                  <Accordion
                  question={el.question}
                  answer={el.answer}
                  turn={turn}
                  setTurn={setTurn}
                  idx={el.idx}
                  />
              </div>
          )
        })}
        <div className='flex justify-center my-5'>
          <Button onClick={async()=>{
            setIsLoading(true);
            const response = await axios.post('/api/apiCall', {
              message: promptStoreValue.promptValue + ' Give the output in simple text.'
            });
            console.log(response.data.responseMessage);
            const formattedOutput = response.data.responseMessage
              .split('\n') // Split the string into lines
              .map((line: any, index: any) => (
                <span key={index}>
                  {line}
                  <br /> {/* Add a line break after each line */}
                </span>
              ));
 
              setoutputStoreValue({ outputValue: formattedOutput });
             
              setIsLoading(false);
            // setoutputStoreValue({ outputValue: response.data.responseMessage });
            router.push('/output');
          }} variant="contained" style={{backgroundColor: '#164e63'}}>Submit</Button>
        </div>
      </div>
    )
  }
  else
  {
    return (
      <div className='w-full h-screen items-center flex justify-center'>
        <CircularProgress />
      </div>
    );
  }
 
}




export default Layout
