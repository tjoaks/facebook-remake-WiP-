import Header from '../../components/header';
import useClickOutside from '../../helpers/clickOutside';
import { useRef, useState } from 'react';

export default function Home() {
  /*  const [visible, setVisible] = useState(true);
  const el = useRef(null);
  useClickOutside(el, () => {
    setVisible(false);
    console.log('you clicked outside');
  }); */
  return (
    <div>
      <Header />
    </div>
  );
}
