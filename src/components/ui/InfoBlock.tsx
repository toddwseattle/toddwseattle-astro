import React from "react";
import Icon from "./Icon";
import type { IconProps } from "./Icon";
import "../../lib/fontawesome";

interface InfoBlockProps {
  icon: IconProps;
  title: string;
  content: string;
  center?: boolean;
}

const InfoBlock: React.FC<InfoBlockProps> = ({
  icon,
  title,
  content,
  center = false,
}) => {
  return (
    <div
      className={`flex ${center ? "flex-col items-center text-center" : "gap-4"}`}
    >
      <div
        className={`${center ? "mb-4" : ""} text-ink-600 dark:text-graphite-400 text-3xl`}
      >
        <Icon icon={icon} />
      </div>
      <div className={center ? "" : "flex-1"}>
        <h3 className="text-xl font-bold text-ink-800 dark:text-paper-100 mb-2">
          {title}
        </h3>
        <p className="text-ink-600 dark:text-paper-200">{content}</p>
      </div>
    </div>
  );
};

export default InfoBlock;
