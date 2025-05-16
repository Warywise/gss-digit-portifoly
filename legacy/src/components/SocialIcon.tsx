import { IconType } from "react-icons";

interface SocialIconProps { Component: IconType, iconName: string, bgColor: string };

const SocialIcon = ({ Component, iconName, bgColor }: SocialIconProps) => {
  return (
    <div
      className={`social-tag grid grid-cols-[25%_75%] items-center gap-1
      rounded shadow-lg ${bgColor} text-white px-2 py-0.5 text-lg`}
    >
      <Component className={`text-2xl text-white`} />
      { iconName }
    </div>
  );
}

export default SocialIcon;
