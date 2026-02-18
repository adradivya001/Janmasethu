import React from 'react';
import styled from 'styled-components';

interface NavButtonProps {
  label: string;
  isActive?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ label, isActive }) => {
  return (
    <StyledWrapper $isActive={isActive}>
      <div className="btn-12"><span>{label}</span></div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div<{ $isActive?: boolean }>`
  .btn-12,
  .btn-12 *,
  .btn-12 :after,
  .btn-12 :before,
  .btn-12:after,
  .btn-12:before {
    border: 0 solid;
    box-sizing: border-box;
  }

  .btn-12 {
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: button;
    background-color: transparent;
    background-image: none;
    color: ${props => props.$isActive ? '#db2777' : '#555'};
    cursor: pointer;
    font-family: 'Nohemi', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif;
    font-size: 0.75rem; /* Reduced for minimal look */
    font-weight: ${props => props.$isActive ? '500' : '400'};
    line-height: 1;
    margin: 0;
    padding: 0;
    text-transform: uppercase;
    display: inline-block;
    letter-spacing: 0.5px;
  }

  .btn-12:disabled {
    cursor: default;
  }

  .btn-12:-moz-focusring {
    outline: auto;
  }

  .btn-12 svg {
    display: block;
    vertical-align: middle;
  }

  .btn-12 [hidden] {
    display: none;
  }

  .btn-12 {
    border-radius: 99rem;
    border-width: 2px;
    overflow: hidden;
    padding: 0.5rem 1rem; /* Reduced padding for minimal look */
    position: relative;
    border: 1px solid transparent; 
  }

  .btn-12 span {
    position: relative;
    z-index: 10;
    transition: color 0.2s ease;
  }
  
  .btn-12:hover span {
    color: #db2777; /* Deep Pink text on hover */
  }

  /* 
   * Hover Effect:
   * Simple, robust slide-up of solid pink background.
   * Fixes partial rendering issues with complex gradients.
   */

  .btn-12:after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: #fce7f3; /* Pink-100 */
    transform: translateY(100%);
    transition: transform 0.2s ease-out;
    z-index: 0;
  }

  .btn-12:hover:after {
    transform: translateY(0);
  }
`;

export default NavButton;
