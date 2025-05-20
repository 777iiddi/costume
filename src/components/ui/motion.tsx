
import React from 'react';

interface MotionProps {
  children: React.ReactNode;
  className?: string;
  animate?: 'fade-in' | 'slide-up' | 'slide-down' | 'zoom-in' | 'bounce';
  delay?: 'none' | 'short' | 'medium' | 'long';
  duration?: 'fast' | 'normal' | 'slow';
  [key: string]: any;
}

const getAnimationClass = (animate?: string, delay?: string, duration?: string) => {
  // Base animation
  let animationClass = animate ? `animate-${animate}` : 'animate-fade-in';
  
  // Add delay class if specified
  if (delay === 'short') animationClass += ' animate-delay-100';
  if (delay === 'medium') animationClass += ' animate-delay-300';
  if (delay === 'long') animationClass += ' animate-delay-500';
  
  // Add duration class if specified
  if (duration === 'fast') animationClass += ' animate-duration-200';
  if (duration === 'slow') animationClass += ' animate-duration-1000';
  
  return animationClass;
};

const createMotionComponent = (Component: any) => {
  return ({ 
    children, 
    className, 
    animate = 'fade-in',
    delay = 'none',
    duration = 'normal',
    ...props 
  }: MotionProps) => (
    <Component
      className={`${getAnimationClass(animate, delay, duration)} ${className || ''}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export const motion = {
  p: createMotionComponent('p'),
  div: createMotionComponent('div'),
  section: createMotionComponent('section'),
  header: createMotionComponent('header'),
  span: createMotionComponent('span'),
  article: createMotionComponent('article'),
  main: createMotionComponent('main'),
  aside: createMotionComponent('aside'),
  nav: createMotionComponent('nav'),
  h1: createMotionComponent('h1'),
  h2: createMotionComponent('h2'),
  h3: createMotionComponent('h3'),
  h4: createMotionComponent('h4'),
  h5: createMotionComponent('h5'),
  h6: createMotionComponent('h6'),
  ul: createMotionComponent('ul'),
  li: createMotionComponent('li'),
  img: createMotionComponent('img'),
};

export default motion;
