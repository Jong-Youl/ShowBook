import ShortForm from '../../components/ShortForm';
import { Container } from './shorts.styles';
import { fetchShook } from '../../api/ShookService';
import { useEffect, useState } from 'react';

function Shorts() {
  const [shookList, setshookList] = useState([]);
  const shook = async () => {
    const shookList = await fetchShook();
    setshookList(shookList);
  };

  useEffect(() => {
    shook().then((r) => console.log('console ' + r));
  }, []);

  return (
    <Container>
      {shookList != null && <ShortForm shortsJson={shookList} />}
    </Container>
  );
}

export default Shorts;
