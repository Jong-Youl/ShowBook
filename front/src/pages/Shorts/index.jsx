import React from 'react';
import ShortForm from '../../components/ShortForm';
import { Container } from './shorts.styles';
import { shortsJson } from '../../etc/shortsJson';

function Shorts() {
  return (
    <Container>
      <ShortForm shortsJson={shortsJson} />
    </Container>
  );
}
export default Shorts;
