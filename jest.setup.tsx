import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '/';
  },
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<object>) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: React.PropsWithChildren<object>) => <section {...props}>{children}</section>,
    span: ({ children, ...props }: React.PropsWithChildren<object>) => <span {...props}>{children}</span>,
    button: ({ children, ...props }: React.PropsWithChildren<object>) => <button {...props}>{children}</button>,
    nav: ({ children, ...props }: React.PropsWithChildren<object>) => <nav {...props}>{children}</nav>,
    header: ({ children, ...props }: React.PropsWithChildren<object>) => <header {...props}>{children}</header>,
    footer: ({ children, ...props }: React.PropsWithChildren<object>) => <footer {...props}>{children}</footer>,
    article: ({ children, ...props }: React.PropsWithChildren<object>) => <article {...props}>{children}</article>,
    aside: ({ children, ...props }: React.PropsWithChildren<object>) => <aside {...props}>{children}</aside>,
    ul: ({ children, ...props }: React.PropsWithChildren<object>) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }: React.PropsWithChildren<object>) => <li {...props}>{children}</li>,
    a: ({ children, ...props }: React.PropsWithChildren<object>) => <a {...props}>{children}</a>,
    p: ({ children, ...props }: React.PropsWithChildren<object>) => <p {...props}>{children}</p>,
    h1: ({ children, ...props }: React.PropsWithChildren<object>) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: React.PropsWithChildren<object>) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: React.PropsWithChildren<object>) => <h3 {...props}>{children}</h3>,
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren<object>) => <>{children}</>,
  useAnimation: () => ({
    start: jest.fn(),
    set: jest.fn(),
  }),
  useInView: () => true,
}));

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
    resolvedTheme: 'light',
  }),
  ThemeProvider: ({ children }: React.PropsWithChildren<object>) => <>{children}</>,
}));

// Suppress console errors during tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render') ||
        args[0].includes('Warning: An update to'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
