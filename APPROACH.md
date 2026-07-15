# Root Cause Analysis of DatePicker Issues

## Issue 1: Why is the calendar popover not visible?

### Root Cause: Missing Portal and z-index issues

**Primary Issue:** The DatePicker doesn't use a Portal for rendering the popover content, and it lacks proper z-index configuration.

**Evidence:**

- `Select` component explicitly uses `<SelectPrimitive.Portal>` to render content outside the DOM hierarchy
- `DatePicker` uses `<PopoverContent>` directly without a portal wrapper
- `PopoverContent` has `z-50` class but no stacking context is established

**Why this causes the issue:**

1. **No Portal:** The popover content is rendered as a sibling to the main DOM element, which can cause clipping issues
2. **z-index instability:** `z-50` relies on Tailwind's arbitrary values which may not establish a proper stacking context
3. **CSS specificity:** Default react-day-picker styles may override ADS styles due to the rendering location

**Comparison with Select component:**

```tsx
// Select component (correct)
<SelectPrimitive.Portal>
  <SelectPrimitive.Content position="popper" className="ads-select__content">
    {/* Content */}
  </SelectPrimitive.Content>
</SelectPrimitive.Portal>

// DatePicker component (problematic)
<PopoverContent className="ads-popover z-50 ...">
  <DayPicker className="ads-calendar" />
</PopoverContent>
```

## Issue 2: Why is the trigger layout different from ADS Input and ADS Select?

### Root Cause: Inconsistent button styling and structure

**Primary Issue:** The DatePicker trigger uses inconsistent button styling and lacks proper icon alignment.

**Evidence:**

- **Input component:** Uses a div wrapper with absolute positioned icons

  ```tsx
  <div className="ads-input-wrapper relative">
    {leftIcon && <span className="absolute left-4">...</span>}
    <input className="ads-input rounded-full ..." />
    {rightIcon && <span className="ads-input__icon ads-input__icon--right">...</span>}
  </div>
  ```

- **Select component:** Uses a trigger with icon positioning inside

  ```tsx
  <SelectPrimitive.Trigger className="ads-select__trigger ...">
    <SelectPrimitive.Value placeholder={placeholder} />
    <ChevronDown className="size-4" />
  </SelectPrimitive.Trigger>
  ```

- **DatePicker component:** Uses a button with icon alignment issues
  ```tsx
  <Button className="ads-input-wrapper relative ads-input rounded-full ...">
    {leftIcon && <Calendar className={statusColor} />} // Issue: Not absolute positioned
    <span>Date text</span>
    {rightIcon && <span>Icon</span>}
  </Button>
  ```

**Specific Problems:**

1. **Placeholder vertical alignment:** No vertical centering for placeholder text
2. **Icon alignment:** Calendar icon is inline, not properly centered with text
3. **Inconsistent spacing:** Different spacing patterns across components

## Issue 3: Why does the calendar still use default styling?

### Root Cause: Missing custom stylesheet and CSS specificity issues

**Primary Issue:** The react-day-picker default CSS is still being imported and applied with higher specificity than custom ADS classes.

**Evidence:**

1. **Direct import:** `import 'react-day-picker/dist/style.css';` loads default styles
2. **Missing override CSS:** No ADS-specific date picker CSS file
3. **Limited customization:** Only a few classNames override is set in DayPicker

**CSS Analysis:**

```tsx
<DayPicker
  className="ads-calendar" // This class needs to be defined
  classNames={{
    // Only partial overrides
    today: 'bg-primary/20 text-primary',
    selected: 'bg-brand text-white ...',
  }}
/>
```

**Problems:**

1. **`ads-calendar` class doesn't exist** in the styles directory
2. **No global override** for core calendar elements like days, navigation, headers
3. **Default react-day-picker styles** have high specificity that overrides custom classes
4. **Missing color system integration** for hover, focus, disabled states

## Architecture Analysis

### Correct Implementation Path:

1. **Add Portal for proper rendering:** Like Select component does
2. **Unify button trigger pattern:** Follow Input component pattern for consistency
3. **Create proper CSS overrides:** Add date-picker.css similar to other components

### Minimal Fix Strategy:

1. **Issue 1:** Add Portal wrapper around PopoverContent
2. **Issue 2:** Reimplement trigger to match Input component pattern (absolute positioned icons)
3. **Issue 3:** Create ads/styles/components/date-picker.css with comprehensive overrides

### Dependencies:

The investigation reveals that fixing these issues requires:

1. **React-day-picker** configuration updates
2. **Radix UI Popover** integration improvements
3. **ADS styling system** completion for date picker

Conclusion: The current implementation follows some patterns but lacks consistency and completeness. The fixes require addressing CSS, structure, and rendering issues across multiple components.
