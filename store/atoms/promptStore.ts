import { atom } from 'recoil';

interface atomProps{
    promptValue: string
};

export const promptStore = atom<atomProps>({
    key: 'promptStore',
    default:{
        promptValue: 'As an accountant, you are tasked with formulating an efficient plan for an advertising campaign. The plan should consider various factors and allocate funds in alignment with the specified variables. Provide the outcomes in the form of key-value pairs, indicating the amount to be spent and the chosen medium, as selected by the user. Additionally, present a detailed plan organized by dates, including suggestions in bullet points. The final output should strictly adhere to the specified format: Overall Expenditure, Media-Specific Expenditure Breakdown, Schedule of Expenditure, and Recommendations. Utilize the given information to derive the results.'
    }
})

