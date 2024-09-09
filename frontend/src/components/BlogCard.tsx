import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import starLogo from '../assets/star.svg';
import PublishButton from './PublishButton';
import useWidth from '../hooks/useWidth';
import BACKEND_URL from '../config';

interface BlogCardType {
  id?: object;
  profile?: boolean;
  published?: boolean;
  author: string;
  date: string;
  words: number;
  title: string;
  description: string;
  image?: string;
  onClick: () => void;
}

export default function BlogCard({
  id, profile, published, author, date, title, words, description, image, onClick,
}: BlogCardType) {
  const [isSelected, setSelected] = useState(published);
  const windowWidth = useWidth();

  const token = localStorage.getItem('token');

  const handleToggleSelect = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog/${isSelected ? 'unpublish' : 'publish'}`,
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 200) {
        setSelected(!isSelected);
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.error('Error occurred while toggling select:', error);
      alert('An error occurred while processing your request.');
    }
  };

  return (
    <div role="button" tabIndex={0} onClick={onClick} onKeyDown={onClick} className="relative">
      <div className="grid grid-cols-10 md:grid-cols-5 bg-primary">
        <div className="col-span-7 md:col-span-4 pb-7">
          <div className="flex items-center pt-5 pb-3 gap-2">
            <div className="relative inline-flex items-center justify-center w-10 h-10 lg:w-7 lg:h-7 overflow-hidden rounded-full bg-gray-600 select-none">
              <span className="font-medium text-gray-300 text-xs">{author[0]}</span>
            </div>
            <div className="font-euclid font-medium text-sm text-secondary">
              {author}
            </div>
            <div className="font-bold text-secondary">
              .
            </div>
            <div className="font-euclid text-sm font-medium text-accent">
              {date}
            </div>
          </div>
          <div className="leading-tight font-euclid font-bold text-xl md:text-2xl pt-1 pb-2 text-secondary">
            {title}
          </div>
          <div className="tracking-normal leading-normal font-euclid font-medium text-accent text-base pb-3">
            {description.length > 50 ? `${description.slice(0, 50)}...` : description}
          </div>
          <div className="flex gap-2 items-center">
            <div>
              <img src={starLogo} className="logo" alt="" />
            </div>
            <div className="text-sm font-medium text-accent">
              {`${Math.ceil(words / 150)} min read`}
            </div>
          </div>
        </div>
        {image && (
        <div className="flex items-center justify-end overflow-hidden col-span-3 md:col-span-1">
          <img className="rounded-sm max-w-20 md:max-w-48 max-h-14 md:max-h-32" src={image} alt="img" />
        </div>
        ) }
      </div>
      {profile && (windowWidth > 1120 ? (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
          role="button"
          tabIndex={0}
          className={`cursor-pointer absolute top-[40%] right-[-10%] w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 ${isSelected ? 'bg-green-500 justify-end' : 'justify-start'}`}
          onClick={handleToggleSelect}
          aria-label={isSelected ? 'Deselect' : 'Select'}
        >
          <motion.div layout className="bg-primary w-6 h-6 rounded-full shadow-md" />
        </div>
      ) : (
        <PublishButton isSelected={isSelected} handleToggleSelect={handleToggleSelect} />
      ))}
      <hr className="border-t-1 border-tertiary" />
    </div>
  );
}
