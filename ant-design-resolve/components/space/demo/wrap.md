---
order: 98
title:
  zh-CN: 自动换行
  en-US: Wrap
---

## zh-CN

自动换行。

## en-US

Auto wrap line.

```tsx
import React from 'react';
import { Space, Button } from 'antd';

const App: React.FC = () => (
  <Space size={[8, 16]} wrap>
    {new Array(20).fill(null).map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Button key={index}>Button</Button>
    ))}
  </Space>
);

export default App;
```
