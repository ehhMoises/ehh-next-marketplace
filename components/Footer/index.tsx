import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer
      className="w-full h-60 mt-10"
      style={{
        backgroundImage: 'url("/top_gradient.jpg")',
        backgroundRepeat: 'repeat-x',
        backgroundSize: '100% 20rem',
      }}
    ></footer>
  );
};

export default Footer;
