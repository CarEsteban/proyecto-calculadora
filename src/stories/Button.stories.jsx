import React from 'react'
import Button from '../components/Button.jsx'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    value: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['number', 'operator', 'special', 'function']
    },
    onClick: { action: 'clicked' }
  }
}

const Template = (args) => <Button {...args} />

export const NumberKey = Template.bind({})
NumberKey.args = { value: '7', type: 'number' }

export const OperatorKey = Template.bind({})
OperatorKey.args = { value: '+', type: 'operator' }

export const FunctionKey = Template.bind({})
FunctionKey.args = { value: 'AC', type: 'function' }

export const SpecialKey = Template.bind({})
SpecialKey.args = { value: '%', type: 'special' }
