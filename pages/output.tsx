import { outputStore } from "@/store/atoms/outputStore";
import { Typography } from "@mui/material";
import { useRecoilValue } from "recoil";

const Output = () => {
    const outputResponse = useRecoilValue(outputStore);
    console.log(outputResponse.outputValue);
    return (
        <div className="flex flex-col justify-center items-center">
        <div className="my-10 flex flex-row justify-center">
        <Typography variant='h4' sx={{ fontWeight: 'bold', textDecoration: 'underline' }} style={{color: "#164e63"}}>Detailed Plan</Typography>
        </div>

        <div className="border-2 border-cyan-900 w-3/4 rounded-xl p-5 font-semibold">
            {outputResponse.outputValue}
        </div>
</div>

    );
};

export default Output;