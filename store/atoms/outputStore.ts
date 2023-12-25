import { atom } from 'recoil';

interface outputProps{
    outputValue: string
};

export const outputStore = atom<outputProps>({
    key: 'outputStore',
    default: {
        outputValue: ''
    }
})