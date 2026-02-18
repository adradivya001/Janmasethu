import React from 'react';
import styled from 'styled-components';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const StyledButton = styled.button`
  /* Base styles matching the snippet */
  color: white;
  font-family: inherit;
  padding: 0.3em;
  padding-left: 1.2em;
  padding-right: 3em; 
  font-size: inherit; /* Allow parent usage of text-sm/text-xs */
  font-weight: 500;
  border-radius: 9999px; /* Pill shape */
  border: none;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 1.6em -0.6em #714da6;
  overflow: hidden;
  position: relative;
  height: 2.4em; /* Reduced from 2.8em for minimal look */
  cursor: pointer;
  transition: all 0.3s;
  
  /* Text shadow for gradient backgrounds */
  text-shadow: 0 1px 2px rgba(0,0,0,0.1); 

  /* Pink background on hover to create the "pink outline" effect */
  &:hover {
    background: #ec4899 !important; /* Tailwind pink-500 */
    background-image: none !important;
    box-shadow: none; /* Optional: simpler look */
  }

  .icon {
    background: white;
    margin-left: 1em;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.8em;
    width: 1.8em;
    border-radius: 50%;
    box-shadow: 0.1em 0.1em 0.6em 0.2em #7b52b9;
    right: 0.3em;
    transition: all 0.3s;
    z-index: 5;
  }

  /* Expanding hover effect */
  &:hover .icon {
    width: calc(100% - 0.25em); 
    height: calc(100% - 0.25em);
    right: 0.125em; /* Center horizontally (half of the gap) */
    border-radius: 9999px;
  }

  /* Icon SVG animation */
  .icon svg {
    width: 1.1em;
    height: 1.1em;
    transition: transform 0.3s;
    color: #7b52b9;
  }

  &:hover .icon svg {
    transform: translateX(0);
  }

  &:active .icon {
    transform: scale(0.95);
  }
  
  /* Text styling */
  span.text-content {
    position: relative;
    z-index: 1;
    transition: opacity 0.2s, color 0.3s;
    white-space: nowrap;
  }

  /* Text vanishes on hover */
  &:hover span.text-content {
    opacity: 0;
    color: transparent;
  }
`;

const AnimatedButton = ({ children, className, onClick, ...props }: AnimatedButtonProps) => {
    return (
        <StyledButton className={className} onClick={onClick} {...props}>
            <span className="text-content">{children}</span>
            <div className="icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor" />
                </svg>
            </div>
        </StyledButton>
    );
}

export default AnimatedButton;
