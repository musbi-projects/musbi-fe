import Button from '@/components/Button/Button';

import React from 'react';

export default function index() {
  return (
    <div>
      <Button size='large' shape='circle' variant='contained' color='primary' onClick={() => {}}>
        버튼
      </Button>
      <Button size='large' shape='circle' variant='outlined' color='primary' onClick={() => {}}>
        버튼
      </Button>
      <Button size='large' shape='circle' variant='text' color='primary' onClick={() => {}}>
        버튼
      </Button>
    </div>
  );
}
