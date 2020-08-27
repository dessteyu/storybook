import React from "react";

export interface ContainerProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the Container be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Container contents
   */
  children?: React.ReactElement | React.ReactNode | string;
}
export const Container = ({
  primary,
  backgroundColor,
  size,
  children,
}: ContainerProps) => {
  return (
    <div
      style={{
        backgroundColor,
      }}
    >
      {children}
    </div>
  );
};
