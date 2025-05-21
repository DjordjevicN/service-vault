import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import { Plus } from "lucide-react";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "UI/Button",
  tags: ["autodocs"],
  args: {
    children: "Click me",
    type: "button",
    variant: "primary",
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
  },
};

export const WithIcon: Story = {
  args: {
    variant: "primary",
    icon: <Plus size={16} />,
  },
};
