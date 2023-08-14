import { fireEvent, screen, waitFor } from '@testing-library/react'
import path from 'src/constants/path'
import { logScreen, renderWithRouter } from 'src/utils/testUtils'
import { describe, expect, it } from 'vitest'
import matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

describe('Login', () => {
  beforeAll(async () => {
    renderWithRouter({ route: path.login })
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument()
    })
  })
  it('Hiển thị lỗi required khi không nhập gì', async () => {
    const { user } = renderWithRouter({ route: path.login })
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument()
    })
    const submitButton = document.querySelector('form button[type="submit"]') as Element
    // user.click(submitButton)
    // expect(await screen.findByText('Email là bắt buộc')).toBeTruthy()
    // expect(await screen.findByText('Password là bắt buộc')).toBeTruthy()
    fireEvent.submit(submitButton)
    await waitFor(async () => {
      expect(await screen.findByText('Email là bắt buộc')).toBeTruthy()
      expect(await screen.findByText('Password là bắt buộc')).toBeTruthy()
    })

    it('Hiển thị lỗi required khi không nhập gì', async () => {
      const emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
      const passwordInput = document.querySelector('form input[type="password"]') as HTMLElement
      const submitButton = document.querySelector('form button[type="submit"]') as HTMLElement
      fireEvent.change(emailInput, {
        target: {
          value: 'test@gmail'
        }
      })
      fireEvent.change(passwordInput, {
        target: {
          value: '123'
        }
      })
      fireEvent.submit(submitButton)
      expect(await screen.findByText('Email khong dung dinh dang')).toBeTruthy()
      expect(await screen.findByText('Do dai tu 6 - 160 ky tu')).toBeTruthy()
      // await logScreen()
    })
  })
})
