import { render } from '@testing-library/react';
import { ELEMENTS, newestElement } from './registry';
import { P } from './palette';
import montgolfiere from './elements/montgolfiere';

describe('montgolfière Saegus (BUG-CE32DB84)', () => {
  it('est référencée, proposée par Julien et mise en avant comme dernier ajout', () => {
    expect(montgolfiere).toMatchObject({ id: 'montgolfiere', layer: 'ciel', ticket: 'BUG-CE32DB84', proposePar: 'Julien' });
    expect(newestElement(ELEMENTS)?.id).toBe('montgolfiere');
  });

  it('porte les couleurs Saegus, une nacelle et traverse le ciel', () => {
    const { container } = render(
      <svg>
        <montgolfiere.Component />
      </svg>,
    );
    const fills = Array.from(container.querySelectorAll<SVGElement>('[style]')).map((n) => n.style.fill);
    expect(fills).toEqual(expect.arrayContaining([P.violet, P.corail, P.jaune]));
    expect(container.querySelector('.anim-montgolfiere')).not.toBeNull();
  });
});
