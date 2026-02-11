/// <reference types="@testing-library/jest-dom" />
import { describe, test, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PhoneInput } from './PhoneInput'
import { COUNTRY_MASKS } from '@shared/constants/countries'

describe('PhoneInput', () => {
  test('если передан value, то в полях ввода отображаются соответствующие цифры', () => {
    const value = '+7 912 345 67 89'

    render(<PhoneInput masks={COUNTRY_MASKS} value={value} />)

    expect(screen.getByTestId('digit-0')).toHaveValue('9')
    expect(screen.getByTestId('digit-1')).toHaveValue('1')
    expect(screen.getByTestId('digit-2')).toHaveValue('2')
    expect(screen.getByTestId('digit-3')).toHaveValue('3')
    expect(screen.getByTestId('digit-4')).toHaveValue('4')
    expect(screen.getByTestId('digit-5')).toHaveValue('5')
  })

  test('если пользователь вводит цифру в поле, то вызывается onChange с отформатированным значением', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<PhoneInput masks={COUNTRY_MASKS} onChange={onChange} />)

    await user.type(screen.getByTestId('digit-0'), '9')

    expect(onChange).toHaveBeenCalledWith('+7 (9')
  })

  test('если пользователь нажимает на селектор страны, то открывается выпадающий список', async () => {
    const user = userEvent.setup()
    render(<PhoneInput masks={COUNTRY_MASKS} />)

    await user.click(screen.getByTestId('country-selector'))

    const dropdown = screen.getByTestId('country-dropdown')
    expect(dropdown).toBeInTheDocument()
    expect(within(dropdown).getByTestId('country-item-ru')).toBeInTheDocument()
    expect(within(dropdown).getByTestId('country-item-us')).toBeInTheDocument()
  })

  test('если пользователь выбирает другую страну в списке, то отображается её префикс и маска', async () => {
    const user = userEvent.setup()
    render(<PhoneInput masks={COUNTRY_MASKS} />)
    await user.click(screen.getByTestId('country-selector'))

    await user.click(screen.getByTestId('country-item-us'))

    expect(screen.getByTestId('country-selector')).toHaveTextContent('+1')
    expect(screen.getByTestId('digit-0')).toBeInTheDocument()
    expect(screen.getByTestId('digit-9')).toBeInTheDocument()
    expect(screen.queryByTestId('digit-10')).not.toBeInTheDocument()
  })

  test('если передан disabled, то селектор страны и поля ввода недоступны', () => {
    render(<PhoneInput masks={COUNTRY_MASKS} disabled />)

    expect(screen.getByTestId('country-selector')).toBeDisabled()
    expect(screen.getByTestId('digit-0')).toBeDisabled()
  })

  test('если поле пустое и в первом инпуте нажат Enter, то у поля показывается состояние error', async () => {
    const user = userEvent.setup()
    render(<PhoneInput masks={COUNTRY_MASKS} />)

    await user.click(screen.getByTestId('digit-0'))
    await user.keyboard('{Enter}')

    expect(screen.getByTestId('digit-0')).toHaveAttribute('data-state', 'error')
  })

  test('если все цифры введены и нажат Enter, то у поля показывается состояние success', async () => {
    const user = userEvent.setup()
    render(<PhoneInput masks={COUNTRY_MASKS} />)
    await user.type(screen.getByTestId('digit-0'), '9123456789')

    await user.keyboard('{Enter}')

    expect(screen.getByTestId('digit-0')).toHaveAttribute('data-state', 'success')
  })
})
