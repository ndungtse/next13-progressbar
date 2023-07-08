import React, { useEffect } from 'react';
import ProgressBar, { Next13ProgressProps } from './ProgressBar';
import { NavigationEvents } from './NavigationEvents';
import { usePathname } from 'next/navigation';
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
  setShowProgressBar: () => {},
});

export const NProvider = (props: NProviderProps) => {
  const [showProgressBar, setShowProgressBar] = React.useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const anchors = document.querySelectorAll('a');
    anchors.forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        if(anchor.target === '_blank') return;
        // add prev onclick
        if (anchor.onclick) {
          anchor.onclick(e);
        }
        if (pathname !== anchor.href) {
          setShowProgressBar(true);
        }
      });
    });
  }, []);

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

export const useNProgress = () => React.useContext(NPContext);
