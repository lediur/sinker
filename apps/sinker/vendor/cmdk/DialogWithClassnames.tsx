import * as RadixDialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import React from "react";

type Children = { children?: React.ReactNode };
type DivProps = React.HTMLAttributes<HTMLDivElement>;

type CommandProps = Children &
  DivProps & {
    /**
     * Accessible label for this command menu. Not shown visibly.
     */
    label?: string;
    /**
     * Optionally set to `false` to turn off the automatic filtering and sorting.
     * If `false`, you must conditionally render valid items based on the search query yourself.
     */
    shouldFilter?: boolean;
    /**
     * Custom filter function for whether each command menu item should matches the given search query.
     * It should return a number between 0 and 1, with 1 being the best match and 0 being hidden entirely.
     * By default, uses the `command-score` library.
     */
    filter?: (value: string, search: string) => number;
    /**
     * Optional controlled state of the selected command menu item.
     */
    value?: string;
    /**
     * Event handler called when the selected item of the menu changes.
     */
    onValueChange?: (value: string) => void;
    /**
     * Optionally set to `true` to turn on looping around when using the arrow keys.
     */
    loop?: boolean;
  };

export type CommandDialogProps = RadixDialog.DialogProps &
  CommandProps & {
    /** Provide a custom element the Dialog should portal into. */
    container?: HTMLElement;

    /** Pass classNames through to the contained overlay element */
    dialogOverlayClassName?: string;

    /** Pass classNames through to the contained content element */
    dialogContentClassName?: string;
  };

/**
 * Renders the command menu in a Radix Dialog.
 *
 * Shimmed here to provide classNames to Root and Overlay components.
 *
 * @see https://github.com/pacocoursey/cmdk/issues/69
 * @see https://github.com/pacocoursey/cmdk/blob/605ae1304baff5ed6f7675d6028ad8dc0b93f0ca/cmdk/src/index.tsx#L773-L788
 */
export const CommandDialog = React.forwardRef<
  HTMLDivElement,
  CommandDialogProps
>((props, forwardedRef) => {
  const {
    open,
    onOpenChange,
    container,
    dialogOverlayClassName,
    dialogContentClassName,
    ...etc
  } = props;
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal container={container}>
        <RadixDialog.Overlay
          cmdk-overlay=""
          className={dialogOverlayClassName}
        />
        <RadixDialog.Content
          aria-label={props.label}
          cmdk-dialog=""
          className={dialogContentClassName}
        >
          <Command ref={forwardedRef} {...etc} />
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
});
