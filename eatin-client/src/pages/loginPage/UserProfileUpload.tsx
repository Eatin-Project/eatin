import styled from "styled-components";
import React, { FC, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";

export type Image = {
    url: string;
    name: string;
    type: string;
};

interface Props {
    updateImageFile: (file: File) => void;
}

export const UserProfileUpload: FC<Props> = ({ updateImageFile }) => {
    const fileInputRef: any = React.createRef();
    const [image, setImage] = useState<Image>();

    const fileChange = (event: any) => {
        event.preventDefault();
        const imageFile = event.target.files[0];
        const url = URL.createObjectURL(imageFile);

        setImage({
            url,
            name: imageFile.name,
            type: imageFile.type,
        });
        updateImageFile(imageFile);
    };

    return (
        <div className="media-upload">
            <IconWrapper>
                {!image ? <PlaceholderIcon /> : <ProfileImage src={image.url} alt={image.name} />}
            </IconWrapper>
            <UploadButton type="button" onClick={() => fileInputRef.current.click()}>
                <AddAPhotoOutlinedIcon />
                <label htmlFor="upload-picture" ref={fileInputRef}>
                    <input
                        id="upload-picture"
                        type="file"
                        multiple={false}
                        hidden
                        onChange={(event) => fileChange(event)}
                    />
                </label>
            </UploadButton>
        </div>
    );
};

const ProfileImage = styled.img`
    width: inherit !important;
    height: inherit !important;
    border-radius: 50%;
    object-fit: cover;
`;

const UploadButton = styled.button`
    border-radius: 50%;
    background: #e9e9e9;
    border-color: transparent;
    position: absolute;
    margin: 6.7em 0 0 4.5em;
    height: 2.5em;
    width: 2.5em;
    box-shadow: #535353 0.5px 0.5px 5px;
`;

const PlaceholderIcon = styled(PersonIcon)`
    width: inherit !important;
    height: inherit !important;
    color: white;
`;

const IconWrapper = styled.div`
    display: flex;
    height: 9em;
    width: 9em;
    background: #e14026;
    border-radius: 50%;
    position: relative;
`;
