import { Circles } from 'react-loader-spinner';
import style from './Loader.module.css';

export const Loader = () => (
  <Circles
    height="80"
    width="80"
    color="#3f51b5"
    ariaLabel="circles-loading"
    wrapperClass={style.wrapper}
    visible={true}
  />
);
