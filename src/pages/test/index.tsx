import Button from "@/components/Button/Button";
import Text from "@/components/Text/Text";
import Select from "@/components/Select";

import React from "react";

export default function index() {
  return (
    <div style={{ margin: "60px auto", width: "787px" }}>
      <Button size='large' shape='circle' variant='contained' color='primary' onClick={() => {}}>
        버튼
      </Button>
      <Button size='large' shape='circle' variant='outlined' color='primary' onClick={() => {}}>
        버튼
      </Button>
      <Button size='large' shape='circle' variant='text' color='primary' onClick={() => {}}>
        버튼
      </Button>
      <Button size='large' shape='circle' variant='contained' color='secondary' onClick={() => {}}>
        버튼
      </Button>
      <Button size='large' shape='circle' variant='outlined' color='secondary' onClick={() => {}}>
        버튼
      </Button>
      <Button size='large' shape='circle' variant='text' color='secondary' onClick={() => {}}>
        버튼
      </Button>
      <Text color='black' size='large'>
        안농
      </Text>
      <Text as={"h1"} color='primary' size='large'>
        안농
      </Text>
      <Text as='h2' color='deepGray' size='large'>
        안농
      </Text>
      <Text as='p' color='lightGray' size='large'>
        안농
      </Text>
      <Select onChange={({id, value}) => console.log(id, value)}>
        {new Array(10).fill(0).map((_, index) => {
          return (
            <Select.Option key={index} id={index.toString()} index={index} value={`옵션 ${index}`}>
              옵션 {index}
            </Select.Option>
          );
        })}
      </Select>
    </div>
  );
}
