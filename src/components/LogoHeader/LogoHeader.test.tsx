import { render, screen } from '@testing-library/react';

import { LogoHeader } from '@/components/LogoHeader';

it('LogoHeader should contain zefir logo', () => {
  render(<LogoHeader />);
  expect(screen.getByTestId('SvgZefirLogoTextIconIcon')).toBeVisible();
});
