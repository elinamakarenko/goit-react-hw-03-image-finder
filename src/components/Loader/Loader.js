import { ImSpinner } from 'react-icons/im';
import s from '../Loader/Loader.module.css';

const Loader = () => {
  return (
    <div className={s.spinner}>
      <ImSpinner size="32" className={s.iconSpin} />
      Загружаем...
    </div>
  );
};
export default Loader;
