---
order: 10
title:
  zh-CN: Block 按钮
  en-US: Block Button
---

## zh-CN

`block` 属性将使按钮适合其父宽度。

## en-US

`block` property will make the button fit to its parent width.

```tsx
import React from 'react';
import { Button } from 'antd';

const App: React.FC = () => (
  <>
    <Button type="primary" block>
      Primary
    </Button>
    <Button block>Default</Button>
    <Button type="dashed" block>
      Dashed
    </Button>
    <Button type="link" block>
      Link
    </Button>
  </>
);

export default App;
```
