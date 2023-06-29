import React from 'react';
import ProgressBar, { Next13ProgressProps } from './ProgressBar';
import { NavigationEvents } from './NavigationEvents';
// import { usePathname } from 'next/navigation';

export interface NProviderProps extends Next13ProgressProps {
  children: React.ReactNode;
}

interface NProviderState {
  showProgressBar: boolean;
  setShowProgressBar: (showProgressBar: boolean) => void;
}

const NPContext = React.createContext<NProviderState>({
  showProgressBar: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setShowProgressBar: () => {},
});

export const NProvider = (props: NProviderProps) => {
  const [showProgressBar, setShowProgressBar] = React.useState(false);
  // const pathname = usePathname();

  const progressProps = { ...props };
  delete progressProps.children;
  return (
    <NPContext.Provider value={{ showProgressBar, setShowProgressBar }}>
      {showProgressBar && <ProgressBar {...props} />}
      <NavigationEvents />
      {props.children}
    </NPContext.Provider>
  );
};

export const useApp = () => React.useContext(NPContext);
