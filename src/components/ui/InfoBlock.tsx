import React from 'react';
import Icon, { IconProps } from './Icon';

interface InfoBlockProps {
  icon: IconProps;
  title: string;
  content: string;
  center?: boolean;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ icon, title, content, center = false }) => {
  return (
    <div className={`flex ${center ? 'flex-col items-center text-center' : 'gap-4'}`}>
      <div className={`${center ? 'mb-4' : ''} text-indigo-600 text-3xl`}>
        <Icon icon={icon} />
      </div>
      <div className={center ? '' : 'flex-1'}>
        <h3 className="text-xl font-bold text-indigo-900 mb-2">{title}</h3>
        <p className="text-gray-700">{content}</p>
      </div>
    </div>
  );
};

export default InfoBlock;
