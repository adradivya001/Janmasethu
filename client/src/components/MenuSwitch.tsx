import React from 'react';
import styled from 'styled-components';

interface MenuSwitchProps {
    isOpen: boolean;
    toggle: () => void;
}

const MenuSwitch: React.FC<MenuSwitchProps> = ({ isOpen, toggle }) => {
    return (
        <StyledWrapper>
            <div id="menuToggle">
                <input
                    id="mobile-menu-checkbox"
                    type="checkbox"
                    checked={isOpen}
                    onChange={toggle}
                />
                <label className="toggle" htmlFor="mobile-menu-checkbox">
                    <div className="bar bar--top" />
                    <div className="bar bar--middle" />
                    <div className="bar bar--bottom" />
                </label>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  /* Scale down the entire component for a minimal look */
  transform: scale(0.6);
  transform-origin: left center;
  /* Compensate for the layout space since transform doesn't affect flow */
  width: 24px; 
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  #menuToggle {
    /* Ensure the toggle doesn't overflow or rely on large margins */
    display: block;
    width: 40px; /* Original width, but scaled down visually */
  }

  #mobile-menu-checkbox {
    display: none;
  }

  .toggle {
    position: relative;
    width: 40px;
    cursor: pointer;
    margin: 0;
    display: block;
    height: calc(4px * 3 + 11px * 2);
  }

  .bar {
    position: absolute;
    left: 0;
    right: 0;
    height: 4px;
    border-radius: calc(4px / 2);
    background: #7b52b9;
    color: inherit;
    opacity: 1;
    transition: none 0.35s cubic-bezier(.5,-0.35,.35,1.5) 0s;
  }

  /***** Tornado Animation *****/

  .bar--top {
    bottom: calc(50% + 11px + 4px/ 2);
    transition-property: bottom,transform;
    transition-delay: calc(0s + 0.35s) * .6;
  }

  .bar--middle {
    top: calc(50% - 4px/ 2);
    transition-property: opacity,transform;
    transition-delay: calc(0s + 0.35s * .3);
  }

  .bar--bottom {
    top: calc(50% + 11px + 4px/ 2);
    transition-property: top,transform;
    transition-delay: 0s;
  }

  #mobile-menu-checkbox:checked + .toggle .bar--top {
    transform: rotate(-135deg);
    transition-delay: 0s;
    bottom: calc(50% - 4px/ 2);
  }

  #mobile-menu-checkbox:checked + .toggle .bar--middle {
    opacity: 0;
    transform: rotate(-135deg);
    transition-delay: calc(0s + 0.35s * .3);
  }

  #mobile-menu-checkbox:checked + .toggle .bar--bottom {
    top: calc(50% - 4px/ 2);
    transform: rotate(-225deg);
    transition-delay: calc(0s + 0.35s * .6);
  }`;

export default MenuSwitch;
