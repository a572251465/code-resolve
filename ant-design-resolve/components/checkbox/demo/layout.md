---
order: 5
title:
  zh-CN: 布局
  en-US: Use with Grid
---

## zh-CN

Checkbox.Group 内嵌 Checkbox 并与 Grid 组件一起使用，可以实现灵活的布局。

## en-US

We can use Checkbox and Grid in Checkbox.Group, to implement complex layout.

```tsx
import React from 'react';
import { Checkbox, Row, Col } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

const onChange = (checkedValues: CheckboxValueType[]) => {
  console.log('checked = ', checkedValues);
};

const App: React.FC = () => (
  <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
    <Row>
      <Col span={8}>
        <Checkbox value="A">A</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="B">B</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="C">C</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="D">D</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="E">E</Checkbox>
      </Col>
    </Row>
  </Checkbox.Group>
);

export default App;
```
