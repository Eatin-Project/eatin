import "./RecipeStages.css";

import { Button, TextField } from "@mui/material";
import { FC } from "react";

interface Props {
    stages: string[];
    onChange: (stages: string[]) => void;
}

export const RecipeStages: FC<Props> = ({ stages, onChange }) => {
    const onTextFieldChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        index: number,
    ) => onChange(stages.map((value, i) => (i === index ? e.target.value : value)));

    const addStage = () => onChange([...stages, ""]);

    return (
        <div className="recipe-stages">
            {stages.map((_, index) => (
                <div key={index} className="recipe-stage">
                    <span>{index + 1})</span>
                    <TextField
                        value={stages[index]}
                        label="stage"
                        multiline
                        fullWidth
                        size="small"
                        onChange={(e) => onTextFieldChange(e, index)}
                    />
                </div>
            ))}
            <Button className="pink-button" variant="contained" onClick={addStage}>
                Add stage
            </Button>
        </div>
    );
};
