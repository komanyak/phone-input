import type { Meta, StoryObj } from '@storybook/react'
import { PhoneInput } from '@components/PhoneInput'
import { COUNTRY_MASKS } from '@shared/constants/countries'

const meta = {
  title: 'Components/PhoneInput',
  component: PhoneInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'error', 'success', 'disabled'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof PhoneInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    masks: COUNTRY_MASKS,
    state: 'default',
    disabled: false,
  },
}

export const WithValue: Story = {
  args: {
    masks: COUNTRY_MASKS,
    value: '9123456789',
    state: 'default',
    disabled: false,
  },
}

export const ErrorState: Story = {
  args: {
    masks: COUNTRY_MASKS,
    value: '912345',
    state: 'error',
    disabled: false,
  },
}

export const SuccessState: Story = {
  args: {
    masks: COUNTRY_MASKS,
    value: '9123456789',
    state: 'success',
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    masks: COUNTRY_MASKS,
    value: '9123456789',
    disabled: true,
  },
}
