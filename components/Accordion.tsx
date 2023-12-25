import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import Accordion1 from './Accordion1';
import Accordion2 from './Accordion2';
import Accordion4 from './Accordion4';
import Accordion3 from './Accordion3';

type Props = {
    question: string,
    answer: string,
    turn: boolean[],
    setTurn: Dispatch<SetStateAction<boolean[]>>,
    idx: number
}

const Accordion = ({question, answer, turn, setTurn, idx}: Props) => {

    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        if(contentRef.current){
            contentRef.current.style.maxHeight = turn![idx] ? `${contentRef.current.scrollHeight}px`:"0px"
        }

    },[contentRef, turn, idx])


    if(idx == 1)
    {
      return (
        <Accordion1 question={question} answer={answer} turn={turn} setTurn={setTurn} idx={idx} />
      );
    }
    else if(idx == 2)
    {
      return (
        <Accordion2 question={question} answer={answer} turn={turn} setTurn={setTurn} idx={idx} />
      );
    }
    else if(idx == 3)
    {
      return (
        <Accordion3 question={question} answer={answer} turn={turn} setTurn={setTurn} idx={idx} />
      );
    }
    else if(idx == 4)
    {
      return (
        <Accordion4 question={question} answer={answer} turn={turn} setTurn={setTurn} idx={idx} />
      );
    }
    else{
      return (
        <div></div>
      );
    }
}

export default Accordion;
