import { ReactNode } from "react";

interface GridContainerProps {
    children: ReactNode;
}

const GridContainer = ({ children }: GridContainerProps) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 ml-7">
        {children}
      </div>
    );
  };
  
export default GridContainer;