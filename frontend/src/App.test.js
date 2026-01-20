import { render, screen } from '@testing-library/react';
import App from './App';

test('renders quiz management system title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Quiz Management System/i);
  expect(titleElement).toBeInTheDocument();
});