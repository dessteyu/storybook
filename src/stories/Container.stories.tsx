import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Container, ContainerProps } from "./Container";

export default {
  title: "Example/Container",
  component: Container,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<ContainerProps> = (args) => <Container {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  primary: false,
  children: "hello word",
};
