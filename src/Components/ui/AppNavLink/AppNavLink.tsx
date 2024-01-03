import React, { FC } from 'react';
import cn from 'classnames';
import { LinkProps, NavLink } from 'react-router-dom';
import styles from './AppNavLink.module.scss';

type LinkPropsType = LinkProps & React.RefAttributes<HTMLAnchorElement>;

type Props = LinkPropsType & {
  children: React.ReactNode;
}

export const AppNavLink: FC<Props> = (props) => {
  const { children, style, className, ...restProps } = props;

  return (
    <NavLink
      className={({ isActive }) => cn(className, {
        [styles.active]: isActive,
      })}
      style={{
        marginRight: '8px',
        ...style,

      }}
      {...restProps}
    >
      {children}
    </NavLink>
  );
};
