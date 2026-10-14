import defaultSpeaker from "../assets/images/default.png";

export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
) => {
  e.currentTarget.src = defaultSpeaker;
};
