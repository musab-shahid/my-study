import { useState, useRef, useCallback } from 'react';

export function useDropdownKeyboard(optionCount: number) {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusOption = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, optionCount - 1));
    setFocusedIndex(clamped);
    const el = optionRefs.current[clamped];
    el?.focus();
    el?.scrollIntoView({ block: 'nearest' });
  }, [optionCount]);

  /** Open and focus option at preferredIndex (e.g. currently selected), default 0 */
  const openDropdown = useCallback((preferredIndex = 0) => {
    setOpen(true);
    const idx = Math.max(0, Math.min(preferredIndex, Math.max(0, optionCount - 1)));
    setFocusedIndex(idx);
    requestAnimationFrame(() => {
      const el = optionRefs.current[idx];
      el?.focus();
      el?.scrollIntoView({ block: 'nearest' });
    });
  }, [optionCount]);

  const closeDropdown = useCallback(() => {
    setOpen(false);
    setFocusedIndex(-1);
    triggerRef.current?.focus();
  }, []);

  const selectOption = useCallback(() => {
    setOpen(false);
    setFocusedIndex(-1);
    triggerRef.current?.focus();
  }, []);

  const handleTriggerKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!open) openDropdown(0);
      else focusOption(0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) {
        openDropdown(optionCount - 1);
      } else {
        focusOption(focusedIndex - 1);
      }
    } else if (e.key === 'Escape' && open) {
      e.preventDefault();
      closeDropdown();
    }
  }, [open, openDropdown, closeDropdown, focusOption, focusedIndex, optionCount]);

  const handleOptionKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusOption(index + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusOption(index - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusOption(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusOption(optionCount - 1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectOption();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeDropdown();
    }
  }, [focusOption, selectOption, closeDropdown, optionCount]);

  return {
    open,
    setOpen,
    focusedIndex,
    setFocusedIndex,
    triggerRef,
    panelRef,
    optionRefs,
    openDropdown,
    closeDropdown,
    selectOption,
    handleTriggerKeyDown,
    handleOptionKeyDown,
  };
}

