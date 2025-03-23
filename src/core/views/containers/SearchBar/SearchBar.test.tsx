import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('should update the query state on input change', () => {
    const setSearchQueryMock = vi.fn();

    const { getByRole } = render(
      <SearchBar
        searchQuery=""
        filterCriteria=""
        setFilterCriteria={vi.fn()}
        genusOptions={[]}
        setSearchQuery={setSearchQueryMock}
      />,
    );
    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: 'test' } });

    expect(setSearchQueryMock).toHaveBeenCalledWith('test');
  });
});
