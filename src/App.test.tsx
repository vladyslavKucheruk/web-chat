import { render, screen } from '@testing-library/react';
import App from './App';
import { wrapWithRouter } from './helpers/wrapWithRouter';

test('renders learn react link', () => {
    render(wrapWithRouter(<App />));
    const linkElement = screen.getByText(/auth me/i);
    expect(linkElement).toBeInTheDocument();
});
