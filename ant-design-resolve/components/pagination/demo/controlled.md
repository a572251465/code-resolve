---
order: 8
title:
  zh-CN: 受控
  en-US: Controlled
---

## zh-CN

受控制的页码。

## en-US

Controlled page number.

```tsx
import React, { useState } from 'react';
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';

const App: React.FC = () => {
  const [current, setCurrent] = useState(3);

  const onChange: PaginationProps['onChange'] = page => {
    console.log(page);
    setCurrent(page);
  };

  return <Pagination current={current} onChange={onChange} total={50} />;
};

export default App;
```
