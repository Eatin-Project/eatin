import "./RecipeStages.css";

import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, TextField } from "@mui/material";
import { FC, useState } from "react";

interface Props {
    stages: string[];
    onChange: (stages: string[]) => void;
    error?: boolean;
    helperText?: string;
}

export const RecipeStages: FC<Props> = ({ stages, onChange, error, helperText }) => {
    const [keys, setKeys] = useState([Math.random()]);

    const onTextFieldChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
        index: number,
    ) => onChange(stages.map((value, i) => (i === index ? e.target.value : value)));

    const addStage = () => {
        onChange([...stages, ""]);
        setKeys((prev) => [...prev, Math.random()]);
    };

    const deleteStage = (index: number) => {
        onChange(stages.filter((_, i) => i !== index));
        setKeys((keys) => keys.filter((_, i) => i !== index));
    };

    const getErrorProps = (index: number) => {
        if (index + 1 === stages.length)
            return {
                error,
                helperText,
            };

        return {};
    };

    return (
        <div className="recipe-stages">
            {stages.map((value, index) => (
                <div key={keys[index]} className="recipe-stage">
                    <span className="index">{index + 1})</span>
                    <TextField
                        value={value}
                        label="stage"
                        multiline
                        fullWidth
                        size="small"
                        onChange={(e) => onTextFieldChange(e, index)}
                        {...getErrorProps(index)}
                    />
                    {stages.length > 1 && (
                        <IconButton
                            className="delete-btn"
                            size="small"
                            onClick={() => deleteStage(index)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}
                </div>
            ))}
            <Button className="red-button" variant="contained" onClick={addStage}>
                Add stage
            </Button>
        </div>
    );
};
