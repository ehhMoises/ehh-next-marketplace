import Image from 'next/image';
import style from './LoaderSearch.module.css';

const LoaderSearch = () => {
  return <Image className={style.desaturate} alt="logo-loading" src="/logo-background.png" width={300} height={300} />;
};

export default LoaderSearch;
