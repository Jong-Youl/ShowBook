import ShortForm from '../../components/ShortForm';
import { Container } from './shorts.styles';
import { fetchShook } from '../../api/ShookService';
import { useEffect, useState } from 'react';

function Shorts() {
  console.log('SHORTS BEFORE \n\n\n');

  const [shookList, setshookList] = useState([]);
  const shook = async () => {
    const shookList = await fetchShook();
    setshookList(shookList);
  };

  useEffect(() => {
    shook().then((r) => console.log(r));
  }, []);

  return (
    <Container>
      <ShortForm shortsJson={shookList} />
    </Container>
  );
}

export default Shorts;
